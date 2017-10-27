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
        res.send(err);
    }
};

exports.insert = async (req, res) => {
    try {
        const newInfo = await new Info(req.body).save();

        res.send(newInfo);
    } catch (err) {
        res.send(err);
    }
};