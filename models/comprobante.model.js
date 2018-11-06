const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    articulo: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});

const ComprobanteSchema = new Schema({
    fecha: {
        type: Number,
        required: true
    },
    entidad: {
        type: String,
        required: true
    },
    operacion: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    comprobante: {
        type: String,
        required: true
    },
    items: {
        type: [ItemSchema]
    },
    imputacion: {
        type: [String]
    }
});

const Comprobante = mongoose.model('comprobante', ComprobanteSchema, 'comprobantes');

module.exports = Comprobante;