const restful = require('node-restful')
const mongoose = restful.mongoose

const receberSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
    dataEmissao: { type: Date, default: Date.now, required: true },
    dataVencimento: { type: Date, default: Date.now, required: true },
    valor: { type: Number, min: 0, required: true },
    valorRecebido: { type: Number, min: 0, default: 0, required: true },
    status: { type: String, required: true, uppercase: true, default: 'ABERTO',
        enum: ['ABERTO', 'PARCIAL', 'PAGO'] },
    
    pessoa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pessoa',
        required: true
    }    
})

receberSchema.method('baixar', async function (dto) {
    this.valorRecebido += parseFloat(dto.valorRecebido);

    if(this.valorRecebido<this.valor)
        this.status = 'PARCIAL'
    else 
        this.status = 'PAGO'

    await this.save();
})

module.exports = restful.model('Receber', receberSchema)