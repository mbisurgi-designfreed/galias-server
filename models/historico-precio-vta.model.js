const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HistoricoPrecioVtaSchema = new Schema({
    articulo: {
        type: Schema.Types.ObjectId,
        ref: 'articulo',
        required: true
    },
    fecha: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});

const HistoricoPrecioVta = mongoose.model('historicoPrecioVta', HistoricoPrecioVtaSchema, 'historicoPrecioVta');

module.exports = HistoricoPrecioVta;