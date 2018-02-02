const Canal = require('../models/canal.model');

exports.getCanales = async (req, res, next) => {
    try {
        const canales = await Canal.find({});

        res.status(200).send({ canales });
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.insert = async (req, res, next) => {
    try {
        const canal = await new Canal(req.body).save();

        res.status(201).send({ canal });
    } catch (err) {
        res.status(422).send({ err });
    }
};

