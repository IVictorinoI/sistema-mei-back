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
    valor: { type: Number, min: 0, required: true },

    titulos: [baixaPagarTituloSchema]
})

module.exports = restful.model('BaixaPagar', baixaPagarSchema)