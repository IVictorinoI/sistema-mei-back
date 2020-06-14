const Item = require('./item')
const errorHandler = require('../common/errorHandler.js')

Item.methods(['get', 'put', 'post'])
Item.updateOptions({new: true, runValidators: true})
Item.after('post', errorHandler).after('put', errorHandler)

module.exports = Item