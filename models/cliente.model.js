const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
    razonSocial: {
        type: String,
        required: true
    }
});

const Cliente = mongoose.model('cliente', ClienteSchema, 'clientes');

module.exports = Cliente;