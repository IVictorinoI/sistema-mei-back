const Venda = require('./venda')
const errorHandler = require('../common/errorHandler.js')

Venda.methods(['get', 'put', 'post', 'delete'])
Venda.updateOptions({new: true, runValidators: true})
Venda.after('post', errorHandler).after('put', errorHandler)

module.exports = Venda