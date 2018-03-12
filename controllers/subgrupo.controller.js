const Subgrupo = require('../models/subgrupo.model');

exports.getSubgrupos = async (req, res, next) => {
    try {
        const subgrupos = await Subgrupo.find({});

        res.status(200).send({ subgrupos });
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.insert = async (req, res, next) => {
    try {
        const subgrupo = await new Subgrupo(req.body).save();

        res.status(201).send({ subgrupo });
    } catch (err) {
        res.status(422).send({ err });
    }
};