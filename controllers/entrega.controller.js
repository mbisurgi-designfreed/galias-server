const config = require('../config/config');
const Remito = require('../models/remito.model');
const Entrega = require('../models/entrega.model');

// exports.list = async (req, res) => {
//     const desde = req.query.desde;
//     const hasta = req.query.hasta;

//     try {
//         const remitos = await Remito.find({ fecha: { $gte: desde, $lte: hasta } })
//             .populate('cliente', 'id codigo razonSocial')
//             .populate('items.articulo', 'id codigo descripcion kilos');

//         res.send(remitos);
//     } catch (err) {
//         res.status(422).send({ err });
//     }
// };

// exports.listToday = async (req, res) => {
//     const today = moment(moment(new Date()).format('YYYY-MM-DD')).valueOf();

//     try {
//         const remitos = await Remito.find({ fecha: today })
//             .populate('cliente', 'id codigo razonSocial')
//             .populate('items.articulo', 'id codigo descripcion kilos');

//         res.send(remitos);
//     } catch (err) {
//         res.status(422).send({ err });
//     }
// };

exports.insert = async (req, res) => {
    try {
        const entrega = await new Entrega(req.body).save();

        if (entrega) {
            await Promise.all(entrega.remitos.map(async (remito) => {
                await Remito.findByIdAndUpdate(remito, { estado: 'entregado' });
            }));
        }

        res.send(entrega);
    } catch (err) {
        console.log(err);
        res.status(422).send({ err });
    }
};

function generarNroRemito(numero) {
    return `0002${numero.toString().padStart(8, '0')}`;
}