const express = require('express')
const auth = require('./auth')


module.exports = function (server) {
    /*
    * Rotas abertas
    */
   const openApi = express.Router()
   server.use('/oapi', openApi)

   const AuthService = require('../api/user/authService')
   openApi.post('/login', AuthService.login)
   openApi.post('/signup', AuthService.signup)
   openApi.post('/validateToken', AuthService.validateToken)


    /*
    * Rotas protegidas por Token JWT
    */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    //protectedApi.use(auth)

    // Rotas de Itens
    const Item = require('../api/item/itemService')
    Item.register(protectedApi, '/itens')

    // Rotas de Pessoas
    const Pessoa = require('../api/pessoa/pessoaService')
    Pessoa.register(protectedApi, '/pessoas')

    // Rotas de CategoriaFinanceiras
    const CategoriaFinanceira = require('../api/categoriaFinanceira/categoriaFinanceiraService')
    CategoriaFinanceira.register(protectedApi, '/categoriaFinanceiras')

    // Rotas de Contas
    const Conta = require('../api/conta/contaService')
    Conta.register(protectedApi, '/contas')

    // Rotas de Recebers
    const Receber = require('../api/receber/receberService')
    Receber.register(protectedApi, '/recebers')

    // Rotas de BaixaRecebers
    const BaixaRecebers = require('../api/baixaReceber/baixaReceberService')
    BaixaRecebers.register(protectedApi, '/baixaRecebers')

    // Rotas de Pagars
    const Pagar = require('../api/pagar/pagarService')
    Pagar.register(protectedApi, '/pagars')

    // Rotas de BaixaPagars
    const BaixaPagars = require('../api/baixaPagar/baixaPagarService')
    BaixaPagars.register(protectedApi, '/baixaPagars')

    // Rotas de Extratos
    const Extrato = require('../api/extrato/extratoService')
    Extrato.register(protectedApi, '/extratos')

    // Rotas de Vendas
    const Venda = require('../api/venda/vendaService')
    Venda.register(protectedApi, '/vendas')


}