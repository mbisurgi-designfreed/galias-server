const Cliente = require('../models/cliente.model');

exports.getById = async (req, res, next) => {
    try {
        const cliente = await Cliente.findById(req.params.id);

        res.send(cliente);
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.getByCodigo = async (req, res, next) => {
    try {
        const codigo = req.body.codigo;

        const cliente = await Cliente.findOne({ codigo });

        res.send(cliente);
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.insert = async (req, res, next) => {
    try {
        const cliente = await new Cliente(req.body).save();

        res.send(cliente);
    } catch (err) {
        res.status(422).send({ err });
    }
};



