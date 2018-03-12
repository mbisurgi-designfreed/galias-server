const Grupo = require('../models/grupo.model');

exports.getGrupos = async (req, res, next) => {
    try {
        const grupos = await Grupo.find({});

        res.status(200).send({ grupos });
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.insert = async (req, res, next) => {
    try {
        const grupo = await new Grupo(req.body).save();

        res.status(201).send({ grupo });
    } catch (err) {
        res.status(422).send({ err });
    }
};