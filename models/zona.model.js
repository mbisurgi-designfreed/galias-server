const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ZonaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    coordenadas: {
        type: Object,
        required: true
    },
    color: {
        type: String,
        required: true
    }
});

const Zona = mongoose.model('zona', ZonaSchema, 'zonas');

module.exports = Zona;
