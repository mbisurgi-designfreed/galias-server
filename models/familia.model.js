const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FamiliaSchema = new Schema({
    codigo: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    }
});

const Grupo = mongoose.model('familia', FamiliaSchema, 'familias');

module.exports = Grupo;