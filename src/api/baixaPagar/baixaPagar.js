const restful = require('node-restful')
const mongoose = restful.mongoose

const baixaPagarTituloSchema = new mongoose.Schema({
    valorPago: { type: Number, min: 0, required: true },
    
    pagar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pagar',
        required: true
    }
})

const baixaPagarSchema = new mongoose.Schema({
    data: { type: Date, default: Date.now, required: true },
    valor: { type: Number, min: 0, default: 0, required: true },

    conta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conta',
        required: true
    },
    categoriaFinanceira: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoriaFinanceira',
        required: true
    },

    titulos: [baixaPagarTituloSchema]
})

baixaPagarSchema.pre('save', function (next) {
    this.valor = this.titulos.map((p) => p.valorPago).reduce((a, b) => a + b, 0)
    next();
})

module.exports = restful.model('BaixaPagar', baixaPagarSchema)