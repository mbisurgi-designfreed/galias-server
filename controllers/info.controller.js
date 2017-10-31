const Info = require('../models/info.model');

exports.list = async (req, res) => {
    const desde = new Date(req.query.desde);
    const hasta = new Date(req.query.hasta);

    try {
        const info = await Info.find({ fecha: { $gte: desde, $lte: hasta } });

        res.send(info);
    } catch (err) {
        res.send(err);
    }
};

exports.listLast = async (req, res) => {
    try {
        const info = await Info.find().sort({ fecha: -1 }).limit(5);

        res.send(info);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.insert = async (req, res) => {
    try {
        const newInfo = await new Info(req.body).save();

        res.status(201).send(newInfo);
    } catch (err) {
        res.status(400).send(err);
    }
};