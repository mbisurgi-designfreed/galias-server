const axios = require('axios');

const config = require('../config/config');
const Cliente = require('../models/cliente.model');
const Pedido = require('../models/pedido.model');

exports.getById = async (req, res, next) => {
    try {
        const cliente = await Cliente.findById(req.params.id);

        res.status(200).send(cliente);
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};

exports.getByCodigo = async (req, res, next) => {
    try {
        const codigo = req.params.codigo;

        const cliente = await Cliente.findOne({ codigo });

        res.status(200).send(cliente);
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};

exports.getClientes = async (req, res, next) => {
    const SIZE = 30;

    try {
        // const page = req.query.page;
        // const skip = page > 0 ? ((page - 1) * SIZE) : 0;

        // const cantidad = await Cliente.find({}).count();
        // const pages = Math.ceil(cantidad / SIZE);

        // const clientes = await Cliente.find({}).skip(skip).limit(SIZE);
        const clientes = await Cliente.find({});

        res.status(200).send({ clientes });
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};

exports.insert = async (req, res, next) => {
    try {
        let cliente = await new Cliente(req.body).save();

        // const sync = await axios.post(`${config.spring.url}/cliente/new`, cliente);

        // if (sync.status === 200) {
        //     cliente = await Cliente.findByIdAndUpdate(cliente._id, { sincronizado: true }, { new: true });
        // }

        res.status(201).send(cliente);
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

        let cliente = await Cliente.findByIdAndUpdate(id, { ...req.body, sincronizado: false }, { new: true });

        // const sync = await axios.patch(`${config.spring.url}/cliente/update`, cliente);

        // if (sync.status === 204) {
        //     cliente = await Cliente.findByIdAndUpdate(cliente._id, { sincronizado: true }, { new: true });
        // } else {
        //     cliente = await Cliente.findByIdAndUpdate(cliente._id, { sincronizado: false }, { new: true });
        // }

        res.status(201).send(cliente);
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

exports.pendiente = async (req, res, next) => {
    try {
        const id = req.params.id;

        let pedidos = await Pedido.find({ cliente: id })
            .populate('items.articulo', 'id codigo descripcion kilos');

        pedidos = pedidos.filter((pedido) => {
            return pedido.estado !== 'completo';
        });

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



