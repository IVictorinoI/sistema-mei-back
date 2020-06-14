const restful = require('node-restful')
const mongoose = restful.mongoose

const pessoaSchema = new mongoose.Schema({
    cpfCnpj: { type: String, required: true },
    nome: { type: String, required: true },
})

module.exports = restful.model('Pessoa', pessoaSchema)