const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ZonaSchema = new Schema({
    descripcion: {
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
    },
    vendedor: {
        type: Schema.Types.ObjectId,
        ref: 'vendedor'
    }
});

const Zona = mongoose.model('zona', ZonaSchema, 'zonas');

module.exports = Zona;
