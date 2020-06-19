const Pagar = require('./pagar')
const errorHandler = require('../common/errorHandler.js')

Pagar.methods(['get', 'put', 'post'])
Pagar.updateOptions({new: true, runValidators: true})
Pagar.after('post', errorHandler).after('put', errorHandler)

module.exports = Pagar