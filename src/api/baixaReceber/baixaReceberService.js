const BaixaReceber = require('./baixaReceber')
const Receber = require('../receber/receber')
const Extrato = require('../extrato/extrato')
const errorHandler = require('../common/errorHandler.js')

BaixaReceber.methods(['get', 'put', 'post', 'delete'])
BaixaReceber.updateOptions({new: true, runValidators: true})
BaixaReceber.after('post', errorHandler).after('put', errorHandler)


const liquidaTitulo = async (req, res, next) => {
    const baixa = req.body
    const _idsRecebers = baixa.titulos.map((p) => p.receber)

    let recebers = [];
    await Receber.find({ _id: _idsRecebers }, function(err, docs) {
        recebers = docs;
    })

    recebers.forEach(async (receber) => {
        const tituloNaBaixa = baixa.titulos.filter((p) => p.receber == receber._id)[0];
        
        await receber.baixar(tituloNaBaixa);

        await new Extrato().entradaPorBaixaReceber(baixa, receber, tituloNaBaixa);
    });    

    next();
}

BaixaReceber.after('post', async (req, res, next) => {
    errorHandler(req, res, () => {
        liquidaTitulo(req, res, next);
    })
})

module.exports = BaixaReceber