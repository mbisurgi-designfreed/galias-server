const moment = require('moment');

const pusher = require('../config/pusher/pusher');
const Pedido = require('../models/pedido.model');
const Cliente = require('../models/cliente.model');
const Articulo = require('../models/articulo.model');

exports.list = async (req, res) => {
    const desde = req.query.desde;
    const hasta = req.query.hasta;

    try {
        const pedidos = await Pedido.find({ fecha: { $gte: desde, $lte: hasta } })
            .populate('cliente', 'id razonSocial')
            .populate('items.articulo', 'id descripcion');

        res.send(pedidos);
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.listToday = async (req, res) => {
    const today = moment(moment(new Date()).format('YYYY-MM-DD')).valueOf();

    try {
        const pedidos = await Pedido.find({ fecha: today })
            .populate('cliente', 'id razonSocial')
            .populate('items.articulo', 'id descripcion');

        res.send(pedidos);
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.insert = async (req, res) => {
    try {
        req.body.enviado = undefined;

        req.body.items = req.body.items.map((item) => {
            item.pendiente = item.cantidad;

            return item;
        });

        const pedido = await new Pedido(req.body).save();

        pusher.trigger('crm', 'pedido', { pedido: pedido._id, cliente: req.body.cliente.razonSocial });

        res.send(pedido);
    } catch (err) {
        res.status(422).send({ err });
    }
};

