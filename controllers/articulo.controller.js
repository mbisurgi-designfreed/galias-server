const Articulo = require('../models/articulo.model');

exports.list = async (req, res, next) => {
    try {
        const articulos = await Articulo.find();

        res.send(articulos);
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.insert = async (req, res, next) => {
    try {
        const articulo = await new Articulo(req.body).save();

        res.send(articulo);
    } catch (err) {
        res.status(422).send({ err });
    }
};

