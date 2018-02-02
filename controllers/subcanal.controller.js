const Subcanal = require('../models/subcanal.model');

exports.getSubcanales = async (req, res, next) => {
    try {
        const subcanales = await Subcanal.find({});

        res.status(200).send({ subcanales });
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.insert = async (req, res, next) => {
    try {
        const subcanal = await new Subcanal(req.body).save();

        res.status(201).send({ subcanal });
    } catch (err) {
        res.status(422).send({ err });
    }
};
