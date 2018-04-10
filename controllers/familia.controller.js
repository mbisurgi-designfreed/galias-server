const Familia = require('../models/familia.model');

exports.getFamilia = async (req, res, next) => {
    try {
        const familias = await Familia.find({});

        res.status(200).send({ familias });
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.insert = async (req, res, next) => {
    try {
        const familia = await new Familia(req.body).save();

        res.status(201).send({ familia });
    } catch (err) {
        res.status(422).send({ err });
    }
};