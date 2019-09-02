const axios = require('axios');

const config = require('../config/config');
const Proveedor = require('../models/proveedor.model');

exports.list = async (req, res, next) => {
    try {
        const proveedores = await Proveedor.find();

        res.status(200).send({ proveedores });
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};

exports.listExcel = async (req, res, next) => {
    try {
        const proveedores = await Proveedor.find();
        res.status(201).send(proveedores);
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};

exports.insert = async (req, res, next) => {
    try {
        let proveedor = await new Proveedor(req.body).save();

        res.status(201).send(proveedor);
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

        let proveedor = await Proveedor.findByIdAndUpdate(id, req.body);

        res.status(201).send(proveedor);
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};
