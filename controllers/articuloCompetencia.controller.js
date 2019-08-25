const axios = require('axios');

const config = require('../config/config');
const ArticuloCompetencia = require('../models/articulo-competencia.model');

exports.list = async (req, res, next) => {
    try {
        const articulos = await ArticuloCompetencia.find();

        res.status(200).send({ articulos });
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};

exports.listExcel = async (req, res, next) => {
    try {
        const articulos = await ArticuloCompetencia.find();
        res.status(201).send(articulos);
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};

exports.insert = async (req, res, next) => {
    try {
        let articulo = await new ArticuloCompetencia(req.body).save();

        res.status(201).send(articulo);
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

        let articulo = await ArticuloCompetencia.findByIdAndUpdate(id, req.body);

        res.status(201).send(articulo);
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};
