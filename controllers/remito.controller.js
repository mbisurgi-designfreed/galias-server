const axios = require('axios');
const moment = require('moment');
const _ = require('lodash');

const config = require('../config/config');
const pusher = require('../config/pusher/pusher');
const Remito = require('../models/remito.model');
const Pedido = require('../models/pedido.model');
const Talonario = require('../models/talonario.model');

exports.list = async (req, res) => {
    const desde = req.query.desde;
    const hasta = req.query.hasta;

    try {
        const remitos = await Remito.find({ fecha: { $gte: desde, $lte: hasta } })
            .populate('cliente', 'id codigo razonSocial')
            .populate('items.articulo', 'id codigo descripcion kilos');

        res.send(remitos);
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.listToday = async (req, res) => {
    const today = moment(moment(new Date()).format('YYYY-MM-DD')).valueOf();

    try {
        const remitos = await Remito.find({ fecha: today })
            .populate('cliente', 'id codigo razonSocial')
            .populate('items.articulo', 'id codigo descripcion kilos');

        res.send(remitos);
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.insert = async (req, res) => {
    try {
        const talonario = await Talonario.findOne({ habilitado: true });

        let remito = await new Remito({ ...req.body.remito, numero: generarNroRemito(req.body.proximo) }).save();

        if (remito) {
            const proximo = req.body.proximo + 1;

            await Talonario.findByIdAndUpdate(talonario.id, { $set: { proximo } });

            const pedido = await Pedido.findById(remito.pedido);

            remito.items.forEach(item => {
                const index = _.findIndex(pedido.items, { _id: item.item });
                const pendiente = pedido.items[index].pendiente;

                pedido.items[index].pendiente = pendiente - item.cantidad;

                pedido.items[index].pendiente === 0 ? pedido.items[index].estado = 'completo' : pedido.items[index].estado = 'pendiente';
            });

            const pendientes = pedido.items.filter((item) => {
                return item.estado !== 'completo';
            });

            pendientes.length > 0 ? pedido.estado = 'pendiente' : pedido.estado = 'completo';

            await Pedido.findByIdAndUpdate(pedido._id, pedido);
        }

        res.send(remito);
    } catch (err) {
        console.log(err);
        res.status(422).send({ err });
    }
};

exports.sync = async (req, res) => {
    try {
        const pedidoId = req.body.pedido;

        await axios.post(`${config.spring.url}/remito/new`, transform(req.body))
            .then((response) => {
                if (response.data === true) {
                    Pedido.findByIdAndUpdate(pedidoId, { sincronizado: true }).then((res) => {});
                    pusher.trigger('crm', 'remito', { pedido: pedidoId });
                } else {
                    pusher.trigger('crm', 'remito.error', { pedido: pedidoId });
                }
            })
            .catch((err) => {
                pusher.trigger('crm', 'remito.error', { pedido: pedidoId });
            });

        res.send();
    } catch (err) {
        res.status(422).send({ err });
    }
};

function generarNroRemito(numero) {
    return `R0010${numero.toString().padStart(8, '0')}`;
}

function transform(remito) {
    return {
        fecha: remito.fecha,
        cliente: remito.cliente,
        items: remito.items
    }
}