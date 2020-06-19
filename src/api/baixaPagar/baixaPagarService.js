const BaixaPagar = require('./baixaPagar')
const errorHandler = require('../common/errorHandler.js')

BaixaPagar.methods(['get', 'put', 'post'])
BaixaPagar.updateOptions({new: true, runValidators: true})
BaixaPagar.after('post', errorHandler).after('put', errorHandler)

module.exports = BaixaPagar