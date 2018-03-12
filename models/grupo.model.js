const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GrupoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    }
});

const Grupo = mongoose.model('grupo', GrupoSchema, 'grupos');

module.exports = Grupo;