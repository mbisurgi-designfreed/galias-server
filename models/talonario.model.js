const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TIPOS = ['remito', 'entrega'];

const TalonarioSchema = new Schema({
    descripcion: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true,
        enum: TIPOS
    },
    pv: {
        type: Number,
        required: true
    },
    desde: {
        type: Number,
        required: true
    },
    hasta: {
        type: Number,
        required: true
    },
    proximo: {
        type: Number,
        required: true
    },
    habilitado: {
        type: Boolean,
        required: true,
        default: true
    }
});

const Talonario = mongoose.model('talonario', TalonarioSchema, 'talonarios');

module.exports = Talonario;