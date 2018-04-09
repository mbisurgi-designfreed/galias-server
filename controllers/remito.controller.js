const axios = require('axios');
const moment = require('moment');
const _ = require('lodash');

const config = require('../config/config');
const Remito = require('../models/remito.model');
const Pedido = require('../models/pedido.model');
const Talonario = require('../models/talonario.model');

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

exports.listToday = async (req, res) => {
    const today = moment(moment(new Date()).format('YYYY-MM-DD')).valueOf();

    try {
        const remitos = await Remito.find({ fecha: today })
            .populate('cliente', 'id razonSocial')
            .populate('items.articulo', 'id descripcion');

        res.send(remitos);
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.insert = async (req, res) => {
    try {
        const talonario = await Talonario.findOne({ habilitado: true });

        let remito = await new Remito({ ...req.body, numero: generarNroRemito(talonario.proximo) }).save();

        if (remito) {
            await Talonario.findByIdAndUpdate(talonario.id, { $inc: { proximo: 1 } });

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

        const rem = await Remito.findById(remito.id)
            .populate('cliente', 'codigo razonSocial')
            .populate('items.articulo', 'codigo descripcion');

        const sync = await axios.post(`${config.spring.url}/remito/new`, rem);

        if (sync.status === 200) {
            remito = await Remito.findByIdAndUpdate(remito.id, { sincronizado: true }, { new: true });
        }

        res.send(remito);
    } catch (err) {
        console.log(err);
        res.status(422).send({ err });
    }
};

function generarNroRemito(numero) {
    return `R0001-${numero.toString().padStart(8, '0')}`;
}