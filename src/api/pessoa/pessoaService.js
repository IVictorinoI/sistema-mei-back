const Pessoa = require('./pessoa')
const errorHandler = require('../common/errorHandler.js')

Pessoa.methods(['get', 'put', 'post', 'delete'])
Pessoa.updateOptions({new: true, runValidators: true})
Pessoa.after('post', errorHandler).after('put', errorHandler)

module.exports = Pessoa