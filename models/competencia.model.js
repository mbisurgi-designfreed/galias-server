const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const CompetenciaSchema = new Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'cliente'
    },
    familia: {
        type: Schema.Types.ObjectId,
        ref: 'familia'
    },
    grupo: {
        type: Schema.Types.ObjectId,
        ref: 'grupo'
    },
    subgrupo: {
        type: Schema.Types.ObjectId,
        ref: 'subgrupo'
    },
    articulo: {
        type: Schema.Types.ObjectId,
        ref: 'articulo'
    },
    cantidad: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    articuloCompetencia: {
        type: Schema.Types.ObjectId,
        ref: 'articuloCompetencia'
    },
    precioCompetencia: {
        type: Number,
        required: true
    },
    cantidadCompetencia: {
        type: Number,
        required: true
    },
    proveedor: {
        type: Schema.Types.ObjectId,
        ref: 'proveedor'
    },
    observaciones: {
        type: String
    }
});

const Competencia = mongoose.model('competencia', CompetenciaSchema, 'competencias');

module.exports = Competencia;