const mongoose = require('mongoose');
const _ = require('lodash');

const Schema = mongoose.Schema;

const PROMOCIONES = ['a+b', '%', 'sin'];
const ESTADOS = ['generado', 'pendiente', 'completo'];

const ItemSchema = new Schema({
    articulo: {
        type: Schema.Types.ObjectId,
        ref: 'articulo',
        require: true
    },
    promocion: {
        type: String,
        required: true,
        enum: PROMOCIONES
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
    pendiente: {
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
        type: Number,
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'cliente'
    },
    sucursal: {
        type: Schema.Types.ObjectId,
        required: true
    },
    comentario: {
        type: String
    },
    items: {
        type: [ItemSchema],
        required: true
    },
    total: {
        type: Number,
        default: 0
    },
    estado: {
        type: String,
        default: 'generado',
        enum: ESTADOS
    }
});

PedidoSchema.pre('save', function (next) {
    const pedido = this;

    this.total = _.reduce(this.items, (sum, item) => {
        const sub = item.cantidad * item.precio;

        return sum + sub;
    }, 0);

    next();
});

const Pedido = mongoose.model('pedido', PedidoSchema, 'pedidos');

module.exports = Pedido;