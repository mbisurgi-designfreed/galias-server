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

        const art = await Articulo.findById(articulo.id).populate('unidadStock').populate('unidadesCpa.unidad').populate('unidadesVta.unidad');

        axios.post(`${config.spring.url}/articulo/new`, art)
            .then((response) => {
                if (response.data === '') {
                    pusher.trigger('crm', 'articulo.error', { articulo: articulo.codigo });
                } else {
                    pusher.trigger('crm', 'articulo', { articulo: articulo.codigo });                    
                }

            })
            .catch((err) => {                
                pusher.trigger('crm', 'articulo.error', { articulo: articulo.codigo });
            });

        // if (sync.status === 200) {
        //     articulo = await Articulo.findByIdAndUpdate(articulo._id, { sincronizado: true }, { new: true });
        // }

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

        const art = await Articulo.findById(articulo.id).populate('unidadStock').populate('unidadesCpa.unidad').populate('unidadesVta.unidad');

        axios.patch(`${config.spring.url}/articulo/update`, art)
            .then((response) => {
                console.log(response.data);
                if (response.data === '') {
                    pusher.trigger('crm', 'articulo.error', { articulo: articulo.codigo });
                } else {
                    pusher.trigger('crm', 'articulo', { articulo: articulo.codigo });                    
                }

            })
            .catch((err) => {
                console.log(err);
                pusher.trigger('crm', 'articulo.error', { articulo: articulo.codigo });
            });

        // if (sync.status === 200) {
        //     articulo = await Articulo.findByIdAn
        //     dUpdate(articulo._id, { sincronizado: true }, { new: true });
        // } else {
        //     articulo = await Articulo.findByIdAndUpdate(articulo._id, { sincronizado: false }, { new: true });
        // }

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
        const articulos = await Promise.all(req.body.map(async (articulo) => {
            return await Articulo.findByIdAndUpdateWithPrecio(articulo._id, { ...articulo, sincronizado: false });
        }));

        const arts = await Articulo.find().populate('unidadStock').populate('unidadesCpa.unidad').populate('unidadesVta.unidad');

        const sync = await axios.patch(`${config.spring.url}/articulo/update/precios`, arts);

        // if (sync.status === 200) {
        //     articulo = await Articulo.findByIdAndUpdate(articulo._id, { sincronizado: true }, { new: true });
        // } else {
        //     articulo = await Articulo.findByIdAndUpdate(articulo._id, { sincronizado: false }, { new: true });
        // }

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
