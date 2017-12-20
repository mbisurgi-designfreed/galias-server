import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CanalSchema = new Schema({
    nombre: {
        type: String,
        required: true
    }
});

const Canal = mongoose.model('canal', CanalSchema, 'canales');

module.exports = Canal;