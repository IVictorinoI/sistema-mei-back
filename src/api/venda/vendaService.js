const Venda = require('./venda')
const Receber = require('../receber/receber')
const Pessoa = require('../pessoa/pessoa')
const errorHandler = require('../common/errorHandler.js')

Venda.methods(['get', 'put', 'post', 'delete'])
Venda.updateOptions({new: true, runValidators: true})
Venda.after('post', errorHandler).after('put', errorHandler)


const lancaReceber = async (req, res, next) => {
    const venda = req.body;

    let pessoa;
    await Pessoa.findOne({ _id: venda.pessoa}, function(err, doc){
        pessoa = doc
    })

    venda.parcelas.forEach(async (parc) => {
        const _newReceber = new Receber({
            descricao: `Venda para ${pessoa.nome} valor ${parc.valor}.`,
            dataVencimento: parc.dataVencimento,
            valor: parseFloat(parc.valor),
            pessoa: venda.pessoa
        })
        await _newReceber.save();
    });    

    next();
}

Venda.after('post', async (req, res, next) => {
    errorHandler(req, res, () => {
        lancaReceber(req, res, next);
    })
})

module.exports = Venda