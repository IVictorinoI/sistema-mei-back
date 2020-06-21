const Conta = require('./conta')
const errorHandler = require('../common/errorHandler.js')

Conta.methods(['get', 'put', 'post', 'delete'])
Conta.updateOptions({new: true, runValidators: true})
Conta.after('post', errorHandler).after('put', errorHandler)

module.exports = Conta