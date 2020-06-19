const restful = require('node-restful')
const mongoose = restful.mongoose

const categoriaFinanceiraSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
})

module.exports = restful.model('CategoriaFinanceira', categoriaFinanceiraSchema)