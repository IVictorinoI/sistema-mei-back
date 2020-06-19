const BaixaReceber = require('./baixaReceber')
const errorHandler = require('../common/errorHandler.js')

BaixaReceber.methods(['get', 'put', 'post'])
BaixaReceber.updateOptions({new: true, runValidators: true})
BaixaReceber.after('post', errorHandler).after('put', errorHandler)

module.exports = BaixaReceber