const restful = require('node-restful')
const mongoose = restful.mongoose

const itemSchema = new mongoose.Schema({    
    descricao: { type: String, required: true },
    unidade: { type: String, required: true },
    precoVenda: { type: Number, min: 0 },
    inativo: { type: Boolean },
    vende: { type: Boolean },
    compra: { type: Boolean }
})

module.exports = restful.model('Item', itemSchema)