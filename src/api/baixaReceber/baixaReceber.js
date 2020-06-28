const restful = require('node-restful')
const mongoose = restful.mongoose


const baixaReceberTituloSchema = new mongoose.Schema({
    valorRecebido: { type: Number, min: 0, required: true },
    
    receber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Receber',
        required: true
    }
})

const baixaReceberSchema = new mongoose.Schema({
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

    titulos: [baixaReceberTituloSchema]
})

baixaReceberSchema.pre('save', function (next) {
    this.valor = this.titulos.map((p) => p.valorRecebido).reduce((a, b) => a + b, 0)
    next();
})

module.exports = restful.model('BaixaReceber', baixaReceberSchema)