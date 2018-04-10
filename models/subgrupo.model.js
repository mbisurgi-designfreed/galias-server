const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubgrupoSchema = new Schema({
    codigo: {
        type: Number,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    grupo: {
        type: Schema.Types.ObjectId,
        ref: 'grupo',
        required: true
    }
});

const Subgrupo = mongoose.model('subgrupo', SubgrupoSchema, 'subgrupos');

module.exports = Subgrupo;

