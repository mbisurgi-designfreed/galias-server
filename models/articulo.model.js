const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const HistoricoPrecioVta = require('./historico-precio-vta.model');
const HistoricoPrecioCpa = require('./historico-precio-cpa.model');

const PROVEEDOR = ['calsa', 'no calsa'];
const IVA = [10.5, 21, 27];

const EquivalenciaSchema = new Schema({
    unidad: {
        type: Schema.Types.ObjectId,
        ref: 'unidad',
        required: true
    },
    equivalencia: {
        type: Number,
        required: true
    },
    defecto: {
        type: Boolean,
        required: true
    }
});

const ArticuloSchema = new Schema({
    codigo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    proveedor: {
        type: String,
        required: true,
        enum: PROVEEDOR
    },
    iva: {
        type: Number,
        required: true,
        enum: IVA
    },
    kilos: {
        type: Number,
        required: true
    },
    lote: {
        type: Boolean,
        required: true
    },
    unidadStock: {
        type: Schema.Types.ObjectId,
        ref: 'unidad'
    },
    unidadesCpa: {
        type: [EquivalenciaSchema],
        required: true
    },
    unidadesVta: {
        type: [EquivalenciaSchema],
        required: true
    },
    precioCpa: {
        type: Number
    },
    historicoPrecioCpa: {
        type: [Schema.Types.ObjectId],
        ref: 'historicoPrecioCpa'
    },
    precioVta: {
        type: Number
    },
    historicoPrecioVta: {
        type: [Schema.Types.ObjectId],
        ref: 'historicoPrecioVta'
    },
    sincronizado: {
        type: Boolean,
        default: false
    }
});

ArticuloSchema.pre('save', async function (next) {
    const newArticulo = this;

    const historicoPrecioCpa = new HistoricoPrecioCpa({ articulo: newArticulo._id, fecha: moment().valueOf(), precio: newArticulo.precioCpa });
    await historicoPrecioCpa.save();

    const historicoPrecioVta = new HistoricoPrecioVta({ articulo: newArticulo._id, fecha: moment().valueOf(), precio: newArticulo.precioVta });
    await historicoPrecioVta.save();

    newArticulo.historicoPrecioCpa.push(historicoPrecioCpa);
    newArticulo.historicoPrecioVta.push(historicoPrecioVta);

    next();
});

ArticuloSchema.statics.findByIdAndUpdateWithPrecio = async function (id, updatedArticulo) {
    try {
        const articulo = await this.findById(id);

        if (articulo.precioCpa !== updatedArticulo.precioCpa) {
            const historicoPrecioCpa = new HistoricoPrecioCpa({ articulo: id, fecha: moment().valueOf(), precio: updatedArticulo.precioCpa });
            await historicoPrecioCpa.save();

            updatedArticulo.historicoPrecioCpa = articulo.historicoPrecioCpa;
            updatedArticulo.historicoPrecioCpa.push(historicoPrecioCpa);
        }

        if (articulo.precioVta !== updatedArticulo.precioVta) {
            const historicoPrecioVta = new HistoricoPrecioVta({ articulo: id, fecha: moment().valueOf(), precio: updatedArticulo.precioVta });
            await historicoPrecioVta.save();

            updatedArticulo.historicoPrecioVta = articulo.historicoPrecioVta;
            updatedArticulo.historicoPrecioVta.push(historicoPrecioVta);
        }

        return await this.findByIdAndUpdate(id, { ...updatedArticulo, sincronizado: false }, { new: true });
    } catch (err) {
        return err;
    }
};

const Articulo = mongoose.model('articulo', ArticuloSchema, 'articulos');

module.exports = Articulo;