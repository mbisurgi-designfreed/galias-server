const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticuloSchema = new Schema({
    codigo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    sincronizado: {
        type: Boolean,
        default: false
    }
});

const Articulo = mongoose.model('articulo', ArticuloSchema, 'articulos');

module.exports = Articulo;