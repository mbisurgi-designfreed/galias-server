const Zona = require('../models/zona.model');

exports.getZonas = async (req, res, next) => {
    try {
        const zonas = await Zona.find({});

        res.status(200).send({ zonas });
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.insert = async (req, res, next) => {
    try {
        const zona = await new Zona(req.body).save();

        res.status(201).send({ zona });
    } catch (err) {
        res.status(422).send({ err });
    }
};

