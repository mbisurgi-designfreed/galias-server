const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Articulo = require('./articulo.model');

const GrupoObjetivoSchema = new Schema({
    codigo: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    articulos: {
        type: [Schema.Types.ObjectId],
        ref: 'articulo'
    }
})

const GrupoObjetivo = mongoose.model('grupoObjetivo', GrupoObjetivoSchema, 'grupoObjetivo');

module.exports = GrupoObjetivo;