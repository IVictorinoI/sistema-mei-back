const restful = require('node-restful')
const mongoose = restful.mongoose

const vendaItemSchema = new mongoose.Schema({
    preco: { type: Number, min: 0, required: true },
    quantidade: { type: Number, min: 0, required: true },
    desconto: { type: Number, min: 0, default: 0, required: true },
    total: { type: Number, min: 0, default: 0, required: true },

    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    }    
})

const vendaParcSchema = new mongoose.Schema({
    valor: { type: Number, min: 0, default: 0, required: true },
    dataVencimento: { type: Date, default: Date.now, required: true }
})

const vendaSchema = new mongoose.Schema({   
    data: { type: Date, default: Date.now, required: true },
    valor: { type: Number, min: 0, default: 0, required: true },
    pago: { type: Boolean, default: false, required: true },

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



vendaSchema.pre('save', function (next) {
    this.itens.forEach(p => {
        p.total = (p.preco * p.quantidade) - p.desconto
    });

    this.valor = this.itens.map((p) => p.total).reduce((a, b) => a + b, 0)

    next();
})

module.exports = restful.model('Venda', vendaSchema)