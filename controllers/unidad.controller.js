const Unidad = require('../models/unidad.model');

exports.insert = async (req, res, next) => {
    try {
        const unidad = await new Unidad(req.body).save();

        res.status(201).send({ unidad });
    } catch (err) {
        res.status(422).send({ err });
    }
};