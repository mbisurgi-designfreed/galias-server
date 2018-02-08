const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DeudaSchema = new Schema({
    total: {
        type: Number,
        required: true
    },
    vencido: {
        type: Number,
        required: true
    },
    nc: {
        type: Number,
        default: 0
    }
});

const InfoSchema = new Schema({
    fecha: {
        type: Number,
        required: [true, 'Fecha es un valor requerido']
    },
    caja: {
        type: Number,
        required: [true, 'Caja es un valor requerido']
    },
    bancos: {
        type: Number,
        required: [true, 'Bancos es un valor requerido']
    },
    cheques: {
        type: Number,
        required: [true, 'Cheques es un valor requerido']
    },
    debito: {
        type: DeudaSchema
    },
    credito: {
        type: DeudaSchema
    }
});

InfoSchema.virtual('%vencidoDebito').get(function () {
    const total = this.debito.total - this.debito.nc;
    const vencido = this.debito.vencido - this.debito.nc;

    return (vencido / total) * 100;
});

InfoSchema.virtual('%vencidoCredito').get(function () {
    return (this.credito.vencido / this.credito.total) * 100;
});

InfoSchema.set('toJSON', { virtuals: true });

const Info = mongoose.model('info', InfoSchema, 'infos');

module.exports = Info;