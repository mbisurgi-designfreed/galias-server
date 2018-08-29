const mongoose = require('mongoose');
const _ = require('lodash');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    articulo: {
        type: Schema.Types.ObjectId,
        ref: 'articulo',
        require: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    kilos: {
        type: Number,
        required: true
    }
});

const EntregaSchema = new Schema({
    fecha: {
        type: Number,
        required: true
    },
    comprobante: {
        type: String,
        required: true
    },
    items: {
        type: [ItemSchema],
        required: true
    },
    clientes: {
        type: [Schema.Types.ObjectId],
        ref: 'clientes'
    },
    remitos: {
        type: [Schema.Types.ObjectId],
        ref: 'remitos'
    },
    kilos: {
        type: Number,
        default: 0
    }
});

EntregaSchema.pre('save', function (next) {
    const entrega = this;

    this.kilos = _.reduce(this.items, (sum, item) => {
        const sub = item.cantidad * item.kilos;

        return sum + sub;
    }, 0);

    next();
});


const Entrega = mongoose.model('entrega', EntregaSchema, 'entregas');

module.exports = Entrega;