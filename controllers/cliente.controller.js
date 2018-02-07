const Cliente = require('../models/cliente.model');

exports.getById = async (req, res, next) => {
    try {
        const cliente = await Cliente.findById(req.params.id);

        res.send(cliente);
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.getByCodigo = async (req, res, next) => {
    try {
        const codigo = req.params.codigo;

        const cliente = await Cliente.findOne({ codigo });

        res.send(cliente);
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.getClientes = async (req, res, next) => {
    const SIZE = 30;

    try {
        const page = req.query.page;
        const skip = page > 0 ? ((page - 1) * SIZE) : 0;

        const cantidad = await Cliente.find({}).count();
        const pages = Math.ceil(cantidad / SIZE);

        // const clientes = await Cliente.find({}).skip(skip).limit(SIZE);
        const clientes = await Cliente.find({});

        res.status(200).send({ clientes, pages });
    } catch (err) {
        res.status(422).send({ err });
    }
};

exports.insert = async (req, res, next) => {
    try {
        const cliente = await new Cliente(req.body).save();

        res.status(201).send(cliente);
    } catch (err) {
        console.log(err);
        res.status(422).send({ err });
    }
};

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id;

        const cliente = await Cliente.findByIdAndUpdate(id, req.body);

        res.status(201).send(cliente);
    } catch (err) {
        console.log(err);
        res.status(422).send({ err });
    }
};



