const restful = require('node-restful')
const mongoose = restful.mongoose

const extratoSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
    valor: { type: Number, min: 0, required: true },
    data: { type: Date, default: Date.now, required: true },

    tipo: { type: String, required: true, uppercase: true, default: 'SAIDA',
        enum: ['ENTRADA', 'SAIDA'] },

    origem: { type: String, required: true, uppercase: true, default: 'MANUAL',
        enum: ['MANUAL', 'RECEBER', 'PAGAR'] },

    pessoa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pessoa',
        required: true
    },
    conta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conta',
        required: true
    },
    categoriaFinanceira: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoriaFinanceira',
        required: true
    }  
})

module.exports = restful.model('Extrato', extratoSchema)