const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PROVEEDOR = ['calsa', 'no calsa'];
const IVA = [10.5, 21, 27];

const EquivalenciaSchema = new Schema({
    unidad: {
        type: Schema.Types.ObjectId,
        ref: 'unidad',
        required: true
    },
    equivalencia: {
        type: Number,
        required: true
    },
    defecto: {
        type: Boolean,
        required: true
    }
});

const ArticuloSchema = new Schema({
    codigo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    proveedor: {
        type: String,
        required: true,
        enum: PROVEEDOR
    },
    iva: {
        type: Number,
        required: true,
        enum: IVA
    },
    kilos: {
        type: Number,
        required: true
    },
    lote: {
        type: Boolean,
        required: true
    },
    unidadStock: {
        type: Schema.Types.ObjectId,
        ref: 'unidad'
    },
    unidadCpa: {
        type: [EquivalenciaSchema],
        required: true,
        default: false
    },
    unidadVta: {
        type: [EquivalenciaSchema],
        required: true,
        default: false
    },
    precioCpa: {
        type: Number
    },
    precioVta: {
        type: Number
    },
    sincronizado: {
        type: Boolean,
        default: false
    }
});

const Articulo = mongoose.model('articulo', ArticuloSchema, 'articulos');

module.exports = Articulo;