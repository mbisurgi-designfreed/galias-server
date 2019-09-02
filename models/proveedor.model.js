const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ProveedorSchema = new Schema({
    codigo: {
        type: Number,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    }
});

ProveedorSchema.pre('save', async function (next) {
    const model = mongoose.model('proveedor');
    const proveedor = this;

    const codigo = await model.findOne({}, '-_id codigo').sort({ codigo: -1 }).limit(1);

    let nextCodigo = codigo ? codigo.codigo : null;

    if (nextCodigo) {
        nextCodigo++;
    } else {
        nextCodigo = 100001;
    }

    this.codigo = nextCodigo;

    next();
});


const Proveedor = mongoose.model('proveedor', ProveedorSchema, 'proveedores');

module.exports = Proveedor;