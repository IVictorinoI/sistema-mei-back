const BaixaPagar = require('./baixaPagar')
const Pagar = require('../pagar/pagar')
const Extrato = require('../extrato/extrato')
const errorHandler = require('../common/errorHandler.js')

BaixaPagar.methods(['get', 'put', 'post', 'delete'])
BaixaPagar.updateOptions({new: true, runValidators: true})
BaixaPagar.after('post', errorHandler).after('put', errorHandler)

const liquidaTitulo = async (req, res, next) => {
    const baixa = req.body;
    const _idsPagars = baixa.titulos.map((p) => p.pagar );

    let pagars = [];
    await Pagar.find({ _id: _idsPagars }, function(err, docs) {
        pagars = docs;
    })

    pagars.forEach(async (pagar) => {
        const tituloNaBaixa = baixa.titulos.filter((p) => p.pagar == pagar._id)[0];
        
        await pagar.baixar(tituloNaBaixa);

        await new Extrato().saidaPorBaixaPagar(baixa, pagar, tituloNaBaixa);
    });    

    next();
}


BaixaPagar.after('post', async (req, res, next) => {
    errorHandler(req, res, () => {
        liquidaTitulo(req, res, next);
    })
})

module.exports = BaixaPagar