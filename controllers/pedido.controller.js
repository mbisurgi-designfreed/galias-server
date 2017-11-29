const Pedido = require('../models/pedido.model');
const Cliente = require('../models/cliente.model');
const Articulo = require('../models/articulo.model');

module.exports = (io) => {
    const action = {};

    action.list = async (req, res) => {
        try {
            const pedidos = await Pedido.find({})
                .populate('cliente', 'id razonSocial')
                .populate('items.articulo', 'id descripcion');

                res.send(pedidos);
        } catch (err) {
            res.status(422).send({ err });
        }
    };

    action.insert = async (req, res) => {
        try {
            const cliente = await Cliente.findOne({ razonSocial: 'Maximiliano Bisurgi' });

            const articulo1 = await Articulo.findOne({ descripcion: 'Levadura Fresca' });
            const articulo2 = await Articulo.findOne({ descripcion: 'Levadura Liquida' });

            const item1 = { articulo: articulo1, promocion: 'Sin Promocion', cantidad: 20, descuento: 0, precio: 150.99, extra: false, cantidadPendiente: 20, estado: 'generado' };
            const item2 = { articulo: articulo2, promocion: 'Sin Promocion', cantidad: 15, descuento: 0, precio: 145.99, extra: false, cantidadPendiente: 15, estado: 'generado' };
            const items = [item1, item2];

            const pedido = await new Pedido({
                fecha: Date.now(),
                cliente: cliente.id,
                items,
                total: 3261.78,
                estado: 'generado'
            }).save();

            res.send(pedido);
        } catch (err) {
            res.status(422).send({ err });
        }
    };

    return action;
};
