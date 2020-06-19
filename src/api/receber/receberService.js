const Receber = require('./receber')
const errorHandler = require('../common/errorHandler.js')

Receber.methods(['get', 'put', 'post'])
Receber.updateOptions({new: true, runValidators: true})
Receber.after('post', errorHandler).after('put', errorHandler)

Receber.route('populado', (req, res, next) => {
    Receber
    .findOne({  })
    .populate('pessoa')
    .exec(function (err, users) {
        res.json(users)
    });
})

module.exports = Receber