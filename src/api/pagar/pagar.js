const restful = require('node-restful')
const mongoose = restful.mongoose

const pagarSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
    dataEmissao: { type: Date, default: Date.now, required: true },
    dataVencimento: { type: Date, default: Date.now, required: true },
    valor: { type: Number, min: 0, required: true },
    valorPago: { type: Number, min: 0, default: 0, required: true },
    status: { type: String, required: false, uppercase: true, default: 'ABERTO',
        enum: ['ABERTO', 'PARCIAL', 'PAGO'] },
    
    pessoa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pessoa',
        required: true
    }    
})

pagarSchema.method('baixar', async function (dto) {
    this.valorPago += parseFloat(dto.valorPago);

    if(this.valorPago<this.valor)
        this.status = 'PARCIAL'
    else 
        this.status = 'PAGO'

    await this.save();
})

module.exports = restful.model('Pagar', pagarSchema)