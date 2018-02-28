const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VendedorSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    celular: {
        type: String,
        required: true
    }
});

const Vendedor = mongoose.model('vendedor', VendedorSchema, 'vendedores');

module.exports = Vendedor;