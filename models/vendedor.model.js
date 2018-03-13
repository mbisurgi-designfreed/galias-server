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
    celular: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Vendedor = mongoose.model('vendedor', VendedorSchema, 'vendedores');

module.exports = Vendedor;