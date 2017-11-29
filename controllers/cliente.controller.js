const Cliente = require('../models/cliente.model');

exports.insert = async (req, res, next) => {
    try {
        const cliente = await new Cliente(req.body).save();

        res.send(cliente);
    } catch (err) {
        res.status(422).send({ err });
    }
};


