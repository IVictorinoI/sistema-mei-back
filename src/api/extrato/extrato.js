const restful = require('node-restful')
const mongoose = restful.mongoose

const extratoSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
    valor: { type: Number, min: 0, required: true },
    data: { type: Date, default: Date.now, required: true },
    _idOrigem: { type: String },    

    tipo: { type: String, required: true, uppercase: true, default: 'SAIDA',
        enum: ['ENTRADA', 'SAIDA'] },

    
    origem: { type: String, required: true, uppercase: true, default: 'MANUAL',
        enum: ['MANUAL', 'RECEBER', 'PAGAR'] },

    pessoa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pessoa',
        required: true
    },
    conta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conta',
        required: true
    },
    categoriaFinanceira: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoriaFinanceira',
        required: true
    }
})

extratoSchema.method('entradaPorBaixaReceber', async function (baixa, receber, dto) {
    this.descricao = `Baixa do título ${receber.descricao}.`;
    this.valor = dto.valorRecebido;
    this._idOrigem = receber._id;
    this.origem = 'RECEBER';
    this.tipo = 'ENTRADA';
    this.pessoa = receber.pessoa;
    this.conta = baixa.conta;
    this.categoriaFinanceira = baixa.categoriaFinanceira;
    await this.save();
})

extratoSchema.method('saidaPorBaixaPagar', async function (baixa, pagar, dto) {
    this.descricao = `Baixa do título ${pagar.descricao}.`;
    this.valor = dto.valorPago;
    this._idOrigem = pagar._id;
    this.origem = 'PAGAR';
    this.tipo = 'SAIDA';
    this.pessoa = pagar.pessoa;
    this.conta = baixa.conta;
    this.categoriaFinanceira = baixa.categoriaFinanceira;
    await this.save();
})

module.exports = restful.model('Extrato', extratoSchema)