const mongoose = require('mongoose');
const _ = require('lodash');

const Schema = mongoose.Schema;

const ESTADOS = ['generado', 'entregado'];

const ItemSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId
    },
    articulo: {
        type: Schema.Types.ObjectId,
        ref: 'articulo',
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
});

const RemitoSchema = new Schema({
    fecha: {
        type: Date,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'cliente'
    },
    pedido: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'pedido'
    },
    items: {
        type: [ItemSchema],
        required: true
    },
    kilos: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    },
    estado: {
        type: String,
        default: 'generado',
        enum: ESTADOS
    },
    sincronizado: {
        type: Boolean,
        default: false
    }
});

RemitoSchema.pre('save', function (next) {
    const remito = this;

    this.total = _.reduce(this.items, (sum, item) => {
        const sub = item.cantidad * item.precio;

        return sum + sub;
    }, 0);

    next();
});

const Remito = mongoose.model('remito', RemitoSchema, 'remitos');

module.exports = Remito;