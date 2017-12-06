const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DIAS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
const CLASIFICACION = ['a', 'b', 'c'];

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

const PersonaInteres = new Schema({
    tipo: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    dni: {
        type: String
    },
    direccion: {
        type: DireccionSchema
    },
    telefono: {
        type: TelefonoSchema
    },
    email: {
        type: String
    }
});

const ClienteSchema = new Schema({
    codigo: {
        type: Number,
        unique: true
    },
    razonSocial: {
        type: String,
        required: true
    },
    cuit: {
        type: String
    },
    nombreComercial: {
        type: String,
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
    },
    clasificacion: {
        type: String,
        required: true,
        default: 'c',
        enum: CLASIFICACION
    },
    diaVisita: {
        type: String,
        required: true,
        enum: DIAS
    },
    diaEntrega: {
        type: String,
        required: true,
        enum: DIAS
    },
    personasInteres: {
        type: [PersonaInteres]
    },
    sincronizado: {
        type: Boolean,
        default: false
    }
});

ClienteSchema.pre('save', async function (next) {
    const model = mongoose.model('cliente');
    const cliente = this;

    let codigo = await model.findOne().sort({ codigo: -1 }).limit(1);

    this.codigo = codigo === null ? codigo = 100001 : codigo++;

    next();
});

const Cliente = mongoose.model('cliente', ClienteSchema, 'clientes');

module.exports = Cliente;