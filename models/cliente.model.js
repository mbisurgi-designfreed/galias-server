const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
});

const DireccionSchema = new Schema({
    calle: {
        type: String,
        required: true
    },
    altura: {
        type: String
    },
    localidad: {
        type: String
    },
    codigoPostal: {
        type: String
    },
    geometry: {
        type: LocationSchema
    }
});

const TelefonoSchema = new Schema({
    tipo: {
        type: String
    },
    numero: {
        type: String
    }
});

const ClienteSchema = new Schema({
    razonSocial: {
        type: String,
        required: true
    },
    direccion: {
        type: DireccionSchema,
        required: true
    },
    telefonos: {
        type: [TelefonoSchema]
    },
    email: {
        type: String
    },
    sucursales: {
        type: [DireccionSchema]
    }
});

const Cliente = mongoose.model('cliente', ClienteSchema, 'clientes');

module.exports = Cliente;