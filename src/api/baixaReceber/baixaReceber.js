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
    valor: { type: Number, min: 0, required: true },

    pessoa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pessoa',
        required: true
    },
    titulos: [baixaReceberTituloSchema]
})

module.exports = restful.model('BaixaReceber', baixaReceberSchema)