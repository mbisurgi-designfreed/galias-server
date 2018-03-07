const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UnidadSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    sigla: {
        type: String,
        required: true
    }
});

const Unidad = mongoose.model('unidad', UnidadSchema, 'unidades');

module.exports = Unidad;