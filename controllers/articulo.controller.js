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

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;

        const articulo = await Articulo.findByIdAndUpdateWithPrecio(id, { ...req.body, sincronizado: false });
        console.log(articulo);

        res.send(articulo);
    } catch (err) {
        console.log(err);
        res.status(422).send({ err });
    }
};

