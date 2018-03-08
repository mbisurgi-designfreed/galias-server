const Unidad = require('../models/unidad.model');

exports.list = async (req, res, next) => {
    try {
        const unidades = await Unidad.find();

        res.status(200).send({ unidades });
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};

exports.insert = async (req, res, next) => {
    try {
        const unidad = await new Unidad(req.body).save();

        res.status(201).send({ unidad });
    } catch (err) {
        res.status(422).send({ err });
    }
};