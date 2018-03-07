const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IVA = ['ri', 'rs', 'cf', 'ex'];
const DIAS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
const PROVEEDOR = ['calsa', 'no calsa'];
const CLASIFICACION = ['a', 'b', 'c'];

const LocationSchema = new Schema({
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
});

const DireccionSchema = new Schema({
    calle: {
        type: String
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
    cargo: {
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
    iva: {
        type: String,
        required: true,
        enum: IVA
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
    canal: {
        type: Schema.Types.ObjectId,
        ref: 'canal'
    },
    subcanal: {
        type: Schema.Types.ObjectId,
        ref: 'subcanal'
    },
    division: {
        type: String,
        required: true,
        enum: PROVEEDOR
    },
    clasificacion: {
        type: String,
        required: true,
        default: 'c',
        enum: CLASIFICACION
    },
    condicionPago: {
        type: Number,
    },
    vendedor: {
        type: Schema.Types.ObjectId,
        ref: 'vendedor'
    },
    diaVisita: {
        type: [String],
        required: true,
        enum: DIAS
    },
    diaEntrega: {
        type: [String],
        required: true,
        enum: DIAS
    },
    personas: {
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

    let { codigo } = await model.findOne({}, '-_id codigo').sort({ codigo: -1 }).limit(1);
 
    if (codigo) {
        codigo++;
    } else {
        codigo = 100001;
    }

    this.codigo = codigo;

    next();
});

const Cliente = mongoose.model('cliente', ClienteSchema, 'clientes');

module.exports = Cliente;