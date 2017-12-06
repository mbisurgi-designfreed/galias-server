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
            const pedido = await new Pedido(req.body).save();

            res.send(pedido);
        } catch (err) {
            res.status(422).send({ err });
        }
    };

    return action;
};
