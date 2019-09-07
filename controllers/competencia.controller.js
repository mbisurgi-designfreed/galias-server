const axios = require('axios');

const config = require('../config/config');
const Competencia = require('../models/competencia.model');

exports.list = async (req, res, next) => {
    try {
        const competencias = await Competencia.find();

        res.status(200).send({ competencias });
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};

exports.listExcel = async (req, res, next) => {
    try {
        const competencias = await Competencia.find();
        res.status(201).send(competencias);
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};

exports.insert = async (req, res, next) => {
    try {
        let competencia = await new Competencia(req.body).save();

        res.status(201).send(competencia);
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;

        let competencia = await Competencia.findByIdAndUpdate(id, req.body);

        res.status(201).send(competencia);
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};
