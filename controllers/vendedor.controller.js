const Vendedor = require('../models/vendedor.model');

exports.getVendedores = async (req, res, next) => {
    try {
        const vendedores = await Vendedor.find({});

        res.status(200).send({ vendedores });
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.insert = async (req, res, next) => {
    try {
        const vendedor = await new Vendedor(req.body).save();

        res.status(201).send({ vendedor });
    } catch (err) {
        res.status(422).send({ err });
    }
};

