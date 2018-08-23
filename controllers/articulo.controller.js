const axios = require('axios');

const config = require('../config/config');
const pusher = require('../config/pusher/pusher');
const Articulo = require('../models/articulo.model');
const Pedido = require('../models/pedido.model');

exports.list = async (req, res, next) => {
    try {
        const articulos = await Articulo.find().select('-historicoPrecioCpa -historicoPrecioVta');

        res.status(200).send({ articulos });
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};

exports.insert = async (req, res, next) => {
    try {
        let articulo = await new Articulo(req.body).save();

        articulo = await Articulo.findById(articulo.id).populate('unidadStock').populate('unidadesCpa.unidad').populate('unidadesVta.unidad');

        if (config.spring.articulos) {
            axios.post(`${config.spring.url}/articulo/new`, articulo)
                .then((response) => {
                    if (response.data === '') {
                        pusher.trigger('crm', 'articulo.error', { articulo: articulo.codigo });
                    } else {
                        Articulo.findByIdAndUpdate(articulo._id, { sincronizado: true }).then((res) => { });
                        pusher.trigger('crm', 'articulo', { articulo: articulo.codigo });
                    }

                })
                .catch((err) => {
                    pusher.trigger('crm', 'articulo.error', { articulo: articulo.codigo });
                });
        }

        res.status(201).send(articulo);
    } catch (err) {
        console.error(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        if (err.name === 'ValidationError') {
            error.message = 'Ha ocurrido un error. Verifique los datos ingresados'
            error.status = 422;
        }

        if (err.code === 'ECONNREFUSED' || err.response.status === 404) {
            error.message = 'Ha ocurrido un error. No se ha podido sincronizar el cliente'
            error.status = 503;
        }

        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;

        let articulo = await Articulo.findByIdAndUpdateWithPrecio(id, { ...req.body, sincronizado: false });

        articulo = await Articulo.findById(id).populate('unidadStock').populate('unidadesCpa.unidad').populate('unidadesVta.unidad');

        if (config.spring.articulos) {
            axios.patch(`${config.spring.url}/articulo/update`, articulo)
                .then((response) => {
                    if (response.data === '') {
                        Articulo.findByIdAndUpdate(id, { sincronizado: false }).then((res) => { });
                        pusher.trigger('crm', 'articulo.error', { articulo: articulo.codigo });
                    } else {
                        Articulo.findByIdAndUpdate(id, { sincronizado: true }).then((res) => { });
                        pusher.trigger('crm', 'articulo', { articulo: articulo.codigo });
                    }

                })
                .catch((err) => {
                    Articulo.findByIdAndUpdate(id, { sincronizado: false }).then((res) => { });
                    pusher.trigger('crm', 'articulo.error', { articulo: articulo.codigo });
                });
        }

        res.status(201).send(articulo);
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        if (err.name === 'ValidationError') {
            error.message = 'Ha ocurrido un error. Verifique los datos ingresados'
            error.status = 422;
        }

        if (err.code === 'ECONNREFUSED' || err.response.status === 404) {
            error.message = 'Ha ocurrido un error. No se ha podido sincronizar el cliente'
            error.status = 503;
        }

        next(error);
    }
};

exports.precios = async (req, res, next) => {
    try {
        let articulos = await Promise.all(req.body.map(async (articulo) => {
            return await Articulo.findByIdAndUpdateWithPrecio(articulo._id, { ...articulo, sincronizado: false }, { new: true });
        }));

        articulos = await Articulo.find().populate('unidadStock').populate('unidadesCpa.unidad').populate('unidadesVta.unidad');

        //const sync = await axios.patch(`${config.spring.url}/articulo/update/precios`, arts);

        axios.patch(`${config.spring.url}/articulo/update/precios`, articulos)
            .then((response) => {
                if (response.data === false) {
                    pusher.trigger('crm', 'precio.error', {});
                } else {
                    articulos.map((articulo) => {
                        Articulo.findByIdAndUpdate(articulo._id, { sincronizado: true }).then((res) => { });
                    });
                    pusher.trigger('crm', 'precio', {});
                }
            })
            .catch((err) => {
                pusher.trigger('crm', 'precio.error', {});
            });

        res.status(201).send(articulos);
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        if (err.name === 'ValidationError') {
            error.message = 'Ha ocurrido un error. Verifique los datos ingresados'
            error.status = 422;
        }

        if (err.code === 'ECONNREFUSED' || err.response.status === 404) {
            error.message = 'Ha ocurrido un error. No se ha podido sincronizar el cliente'
            error.status = 503;
        }

        next(error);
    }
};

exports.pendiente = async (req, res, next) => {
    try {
        const id = req.params.id;

        const pedidos = await Pedido.find({ estado: { $ne: 'completo' } })
            .populate('items.articulo', 'id codigo descripcion kilos');

        const articulos = {};

        pedidos.map((pedido) => {
            pedido.items.map((item) => {
                if (articulos[item.articulo._id]) {
                    const pendiente = articulos[item.articulo._id].cantidad + item.pendiente;

                    articulos[item.articulo._id].cantidad = pendiente;
                } else {
                    articulos[item.articulo._id] = {
                        codigo: item.articulo.codigo,
                        descripcion: item.articulo.descripcion,
                        cantidad: item.pendiente
                    }
                }
            });
        })

        res.send(articulos);
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};
