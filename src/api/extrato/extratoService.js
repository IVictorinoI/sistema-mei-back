const Extrato = require('./extrato')
const errorHandler = require('../common/errorHandler.js')

Extrato.methods(['get', 'put', 'post'])
Extrato.updateOptions({new: true, runValidators: true})
Extrato.after('post', errorHandler).after('put', errorHandler)

module.exports = Extrato