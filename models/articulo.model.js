const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticuloSchema = new Schema({
    descripcion: {
        type: String,
        required: true
    }
});

const Articulo = mongoose.model('articulo', ArticuloSchema, 'articulos');

module.exports = Articulo;