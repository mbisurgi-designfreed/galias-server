const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DeudaSchema = new Schema({
    total: {
        type: Number,
        required: true
    },
    vencido: {
        type: Number,
        required: true
    }
});

const InfoSchema = new Schema({
    fecha: {
        type: Date,
        required: [true, 'Fecha es un valor requerido']
    },
    caja: {
        type: Number,
        required: [true, 'Caja es un valor requerido']
    },
    bancos: {
        type: Number,
        required: [true, 'Bancos es un valor requerido']
    },
    cheques: {
        type: Number,
        required: [true, 'Cheques es un valor requerido']
    },
    debito: {
        type: DeudaSchema
    },
    credito: {
        type: DeudaSchema
    }
});

const Info = mongoose.model('info', InfoSchema, 'infos');

module.exports = Info;