const Venta = require('../models/venta.model');

exports.uploadVentas = async (req, res) => {
    try {
        const ventas = await Venta.insertMany(req.body.rows);
        console.log(ventas);

        res.status(200).send({ ventas });
    } catch (err) {
        console.log(err);

        const error = new Error('Ha ocurrido un error');
        error.status = 500;

        next(error);
    }
};