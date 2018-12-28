const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VentaSchema = new Schema({
    fecha: {
        type: Date
    },
    tipo: {
        type: String
    },
    comprobante: {
        type: String
    },
    codigoVendedor: {
        type: String
    },
    vendedor: {
        type: String
    },
    codigoCliente: {
        type: String
    },
    razonSocial: {
        type: String
    },
    codigoArticulo: {
        type: String
    },
    descripcion: {
        type: String
    },
    cantidad: {
        type: Number
    },
    precio: {
        type: Number
    },
    unidad: {
        type: String
    }
});

const Venta = mongoose.model('venta', VentaSchema, 'ventas');

module.exports = Venta;