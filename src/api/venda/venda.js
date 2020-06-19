const restful = require('node-restful')
const mongoose = restful.mongoose

const vendaItemSchema = new mongoose.Schema({
    preco: { type: Number, min: 0, required: true },
    quantidade: { type: Number, min: 0, required: true },
    desconto: { type: Number, min: 0, required: true },
    total: { type: Number, min: 0, required: true },

    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    }    
})

const vendaParcSchema = new mongoose.Schema({
    valor: { type: Number, min: 0, required: true },
    dataVencimento: { type: Date, default: Date.now, required: true }
})

const vendaSchema = new mongoose.Schema({   
    data: { type: Date, default: Date.now, required: true },
    valor: { type: Number, min: 0, required: true },

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
    itens: [vendaItemSchema],
    parcelas: [vendaParcSchema],
})

module.exports = restful.model('Venda', vendaSchema)