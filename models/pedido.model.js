const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ESTADOS = ['generado', 'pendiente', 'completo'];

const ItemSchema = new Schema({
    articulo: {
        type: Schema.Types.ObjectId,
        ref: 'articulo'
    },
    promocion: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    descuento: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    extra: {
        type: Boolean,
        required: true
    },
    cantidadPendiente: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        required: true,
        default: 'generado',
        enum: ESTADOS
    }
});

const PedidoSchema = new Schema({
    fecha: {
        type: Date,
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'cliente'
    },
    items: {
        type: [ItemSchema],
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        required: true,
        default: 'generado',
        enum: ESTADOS
    }
});

const Pedido = mongoose.model('pedido', PedidoSchema, 'pedidos');

module.exports = Pedido;