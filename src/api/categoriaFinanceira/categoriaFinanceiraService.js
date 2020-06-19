const CategoriaFinanceira = require('./categoriaFinanceira')
const errorHandler = require('../common/errorHandler.js')

CategoriaFinanceira.methods(['get', 'put', 'post'])
CategoriaFinanceira.updateOptions({new: true, runValidators: true})
CategoriaFinanceira.after('post', errorHandler).after('put', errorHandler)

module.exports = CategoriaFinanceira