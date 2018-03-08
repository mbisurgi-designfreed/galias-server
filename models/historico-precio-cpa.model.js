const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HistoricoPrecioCpaSchema = new Schema({
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

const HistoricoPrecioCpa = mongoose.model('historicoPrecioCpa', HistoricoPrecioCpaSchema, 'historicoPrecioCpa');

module.exports = HistoricoPrecioCpa;