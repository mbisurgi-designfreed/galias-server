const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubcanalSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    canal: {
        type: Schema.Types.ObjectId,
        ref: 'canal',
        required: true
    }
});

const Subcanal = mongoose.model('subcanal', SubcanalSchema, 'subcanales');

module.exports = Subcanal;