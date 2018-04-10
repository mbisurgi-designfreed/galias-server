const axios = require('axios');

const config = require('../config/config');
const Articulo = require('../models/articulo.model');

exports.list = async (req, res, next) => {
    try {
        const articulos = await Articulo.find().select('-historicoPrecioCpa -historicoPrecioVta');

        res.status(200).send({ articulos });
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};

exports.insert = async (req, res, next) => {
    try {
        let articulo = await new Articulo(req.body).save();

        // const art = await Articulo.findById(articulo.id).populate('unidadStock').populate('unidadesCpa.unidad').populate('unidadesVta.unidad');

        // const sync = await axios.post(`${config.spring.url}/articulo/new`, art);

        // if (sync.status === 200) {
        //     articulo = await Articulo.findByIdAndUpdate(articulo._id, { sincronizado: true }, { new: true });
        // }

        res.status(201).send(articulo);
    } catch (err) {
        console.error(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        if (err.name === 'ValidationError') {
            error.message = 'Ha ocurrido un error. Verifique los datos ingresados'
            error.status = 422;
        }

        if (err.code === 'ECONNREFUSED' || err.response.status === 404) {
            error.message = 'Ha ocurrido un error. No se ha podido sincronizar el cliente'
            error.status = 503;
        }

        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;

        // let articulo = await Articulo.findByIdAndUpdateWithPrecio(id, { ...req.body, sincronizado: false });

        // const art = await Articulo.findById(articulo.id).populate('unidadStock').populate('unidadesCpa.unidad').populate('unidadesVta.unidad');

        // const sync = await axios.patch(`${config.spring.url}/articulo/update`, art);

        if (sync.status === 200) {
            articulo = await Articulo.findByIdAndUpdate(articulo._id, { sincronizado: true }, { new: true });
        } else {
            articulo = await Articulo.findByIdAndUpdate(articulo._id, { sincronizado: false }, { new: true });
        }

        res.status(201).send(articulo);
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        if (err.name === 'ValidationError') {
            error.message = 'Ha ocurrido un error. Verifique los datos ingresados'
            error.status = 422;
        }

        if (err.code === 'ECONNREFUSED' || err.response.status === 404) {
            error.message = 'Ha ocurrido un error. No se ha podido sincronizar el cliente'
            error.status = 503;
        }

        next(error);
    }
};

exports.precios = async (req, res, next) => {
    try {
        const articulos = await Promise.all(req.body.map(async (articulo) => {
            return await Articulo.findByIdAndUpdateWithPrecio(articulo._id, { ...articulo, sincronizado: false });
        }));

        // const arts = await Articulo.findById({}).populate('unidadStock').populate('unidadesCpa.unidad').populate('unidadesVta.unidad');

        // const sync = await axios.patch(`${config.spring.url}/articulo/update/precios`, arts);

        // if (sync.status === 200) {
        //     articulo = await Articulo.findByIdAndUpdate(articulo._id, { sincronizado: true }, { new: true });
        // } else {
        //     articulo = await Articulo.findByIdAndUpdate(articulo._id, { sincronizado: false }, { new: true });
        // }

        res.status(201).send(articulos);
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        if (err.name === 'ValidationError') {
            error.message = 'Ha ocurrido un error. Verifique los datos ingresados'
            error.status = 422;
        }

        if (err.code === 'ECONNREFUSED' || err.response.status === 404) {
            error.message = 'Ha ocurrido un error. No se ha podido sincronizar el cliente'
            error.status = 503;
        }

        next(error);
    }
};

