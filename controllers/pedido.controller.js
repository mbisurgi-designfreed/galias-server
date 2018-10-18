const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');

const email = require('../config/email/email');
const pusher = require('../config/pusher/pusher');
const Pedido = require('../models/pedido.model');
const Cliente = require('../models/cliente.model');
const Articulo = require('../models/articulo.model');

exports.list = async (req, res) => {
    const desde = req.query.desde;
    const hasta = req.query.hasta;

    try {
        const pedidos = await Pedido.find({ fecha: { $gte: desde, $lte: hasta } })
            .populate('cliente', 'id codigo razonSocial')
            .populate('items.articulo', 'id codigo descripcion kilos')
            .populate('user', 'email');

        res.send(pedidos);
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.listToday = async (req, res) => {
    const today = moment(moment(new Date()).format('YYYY-MM-DD')).valueOf();

    try {
        const pedidos = await Pedido.find({ fecha: today })
            .populate('cliente', 'id codigo razonSocial')
            .populate('items.articulo', 'id codigo descripcion')
            .populate('user', 'email');

        res.send(pedidos);
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.pendienteCliente = async (req, res) => {
    const cliente = mongoose.Types.ObjectId(req.params.cliente);

    try {
        const pedidos = await Pedido.find({ cliente, 'items.pendiente': { $gt: 0 } })
            .populate('items.articulo', 'id codigo descripcion kilos');

        // const pedidos = await Pedido.aggregate([
        //     { $match: { cliente, 'items.pendiente': { $gt: 0 } } },
        //     { $unwind: '$items' },
        // ]);

        // await Pedido.populate(pedidos, { path: 'items.articulo', select: 'id descripcion' });

        res.send(pedidos);
    } catch (err) {
        res.status(422).send({ err });
    }
}

exports.insert = async (req, res) => {
    try {
        req.body.enviado = undefined;

        req.body.items = req.body.items.map((item) => {
            item.pendiente = item.cantidad;

            return item;
        });

        let pedido = await new Pedido({ ...req.body, user: req.user }).save();
        pedido = await Pedido.findById(pedido._id)
            .populate('cliente', 'id codigo razonSocial')
            .populate('items.articulo', 'id codigo descripcion');

        pusher.trigger('crm', 'pedido', { pedido: pedido, cliente: req.body.cliente.razonSocial });

        const mail = {
            from: 'pedidos@galia.com.ar',
            to: 'pedidos@galia.com.ar',
            subject: `Nuevo pedido - ${req.body.cliente.razonSocial}`,
            text: `Se ha generado un nuevo pedido con numero ${pedido._id}. Para verlo ingrese a http://galias-app-web.herokuapp.com/pedidos/`
        };

        email.sendMail(mail);

        res.send(pedido);
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.anular = async (req, res, next) => {
    try {
        const id = req.body.id;

        const pedido = await Pedido.findByIdAndUpdate(id, { estado: 'anulado' }, { new: true });

        res.status(201).send(pedido);
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.eliminarItem = async (req, res, next) => {
    try {
        const pedidoId = req.body.pedidoId;
        const itemId = req.body.itemId;

        const pedido = await Pedido.findById(pedidoId);
        _.remove(pedido.items, item => item._id.toString() === itemId);

        const total = _.reduce(pedido.items, (sum, item) => {
            const sub = item.cantidad * item.precio;

            return sum + sub;
        }, 0);

        if (pedido.items.length > 0) {
            await Pedido.findByIdAndUpdate(pedidoId, { items: pedido.items, total });
        } else {
            await Pedido.findByIdAndUpdate(pedidoId, { items: pedido.items, total, estado: 'anulado' })
        }

        res.status(201).send(pedido);
    } catch (err) {
        res.status(422).send({ err });
    }
};

