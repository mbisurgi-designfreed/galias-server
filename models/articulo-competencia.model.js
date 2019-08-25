const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ArticuloCompetenciaSchema = new Schema({
    codigo: {
        type: Number,
        unique: true
    },
    descripcion: {
        type: String,
        required: true
    },
    proveedor: {
        type: String,
        required: true
    }
});

ArticuloCompetenciaSchema.pre('save', async function (next) {
    const model = mongoose.model('articuloCompetencia');
    const articuloCompetencia = this;

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


const ArticuloCompetencia = mongoose.model('articuloCompetencia', ArticuloCompetenciaSchema, 'articulosCompetencia');

module.exports = ArticuloCompetencia;