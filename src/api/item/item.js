const restful = require('node-restful')
const mongoose = restful.mongoose

const itemSchema = new mongoose.Schema({
    identificacao: { type: String, required: true },
    descricao: { type: String, required: true },
    precoVenda: { type: Number, min: 0 },
    unidade: { type: String },
    ativo: { type: Number },
    vende: { type: Number },
    compra: { type: Number }
})

module.exports = restful.model('Item', itemSchema)