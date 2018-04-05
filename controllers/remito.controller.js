const mongoose = require('mongoose');
const _ = require('lodash');

const Remito = require('../models/remito.model');
const Pedido = require('../models/pedido.model');

exports.list = async (req, res) => {
    const desde = req.query.desde;
    const hasta = req.query.hasta;

    try {
        const remitos = await Remito.find({ fecha: { $gte: desde, $lte: hasta } })
            .populate('cliente', 'id razonSocial')
            .populate('items.articulo', 'id descripcion');

        res.send(remitos);
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.insert = async (req, res) => {
    try {
        const remito = await new Remito(req.body).save();

        if (remito) {
            const pedido = await Pedido.findById(remito.pedido);

            remito.items.forEach(item => {
                console.log('forEach', item);
                console.log('forEach', pedido.items);
                const index = _.findIndex(pedido.items, { _id: item.item });
                console.log(index);
                const pendiente = pedido.items[index].pendiente;
                console.log(pendiente);

                pedido.items[index].pendiente = pendiente - item.cantidad;
            });

            console.log(pedido);

            await Pedido.findByIdAndUpdate(pedido._id, pedido);
        }

        res.send(remito);
    } catch (err) {
        console.log(err);
        res.status(422).send({ err });
    }
};