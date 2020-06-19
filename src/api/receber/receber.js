const restful = require('node-restful')
const mongoose = restful.mongoose

const receberSchema = new mongoose.Schema({
    numero: { type: Number, min: 1, required: true },
    descricao: { type: String, required: true },
    dataEmissao: { type: Date, default: Date.now, required: true },
    dataVencimento: { type: Date, default: Date.now, required: true },
    valor: { type: Number, min: 0, required: true },
    valorRecebido: { type: Number, min: 0, required: true },
    status: { type: String, required: false, uppercase: true,
        enum: ['ABERTO', 'PARCIAL', 'PAGO'] },
    
    pessoa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pessoa',
        required: true
    }    
})

module.exports = restful.model('Receber', receberSchema)