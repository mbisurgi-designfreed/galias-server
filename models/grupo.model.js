const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GrupoSchema = new Schema({
    codigo: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    }
});

const Grupo = mongoose.model('grupo', GrupoSchema, 'grupos');

module.exports = Grupo;