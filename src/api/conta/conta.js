const restful = require('node-restful')
const mongoose = restful.mongoose

const contaSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
})

module.exports = restful.model('Conta', contaSchema)