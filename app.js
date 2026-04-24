/***********************************************************************************
 * Objetivo: Arquivo responsável pela criação da API do projeto de desafio final
 * com objetivo de criar uma api para um app de conversas
 * Data: 13/04/2026
 * Autor: May
 * Versão: 1.0
 **********************************************************************************/

//Import das dependencias para criar a API 
const express = require('express')
const cors = require('cors')

//criando um obj para manipular o express
const app = express()

//conjunto de permissões a serem aplicadas no CORS da API
const corsOptions = {
    origin: ['*'], //origem da requisição, podendo ser um ip ou um * que significa todos
    methods: 'GET', //methods são os verbos que serão liberados na API (GET, POST, PUT, DELETE)
    allowedHeaders: ['Content-Type', 'Autorization'] //permissoes do cabeçalho do CORS
}

//configura as permissoes da API atraves do CORS 
app.use(cors(corsOptions))

//response -> retornos da API
//request -> chegada de dados na API

const funcoes = require('./modulo/funcoes.js')

//endpoint para listar todos os dados da api
app.get('/v1/senai/whatsapp/contatos', function (request, response) {

    let usuarios = funcoes.getListarContatos()

    response.json(usuarios)
    response.status(200)
})

//endpoint para listar dados do usuario
app.get('/v1/senai/whatsapp/usuario/:numero', function (request, response) {
    let numeroUsuario = request.params.numero
    let usuario = funcoes.getListarDadosDaConta(numeroUsuario)

    if (usuario) {
        response.status(200)
        response.json(usuario)
    } else {
        response.status(404)
        response.json({ "message": "O usuario informado não foi encontrado" })
    }
})


//endpoint para retornar os dados de cada contato de um numero
app.get('/v1/senai/whatsapp/contato/:numero', function (request, response) {
    let numeroUsuario = request.params.numero
    let usuario = funcoes.getListarDadosDeContato(numeroUsuario)

    if (usuario) {
        response.status(200)
        response.json(usuario)
    } else {
        response.status(404)
        response.json({ "message": "O usuario informado não foi encontrado" })
    }
})

//endpoint para listar todas as mensagens  trocadas de uma conta de usuario
app.get('/v1/senai/whatsapp/contact', function (request, response) {
    let numeroUsuario = request.query.numero
    let usuario = funcoes.getListarMensagensUsuarios(numeroUsuario)

    if (usuario) {
        response.status(200)
        response.json(usuario)
    } else {
        response.status(404)
        response.json({ "message": "O usuario informado não foi encontrado" })
    }
})

//endpoint para listar uma conversa de um usuário e um contato
app.get('/v1/senai/whatsapp/conversa/usuario', function (request, response) {
    let numeroUsuario = request.query.numero
    let mensagemUsuario = request.query.usuario
    let user = funcoes.getListarConversasUsuarios(numeroUsuario, mensagemUsuario)

    if (user) {
        response.status(200)
        response.json(user)
    } else {

        response.status(404)
        response.json({ "message": "O usuario informado não foi encontrado" })
    }

})

//endpoint para listar uma conversa com base em uma palavra chave
app.get('/v1/senai/whatsapp/mensagem', function (request, response) {
    let numeroUsuario = request.query.numero
    let palavraMensagem = request.query.palavra
    let user = funcoes.getListarPalavraChave(numeroUsuario, palavraMensagem)

    if (user) {
        response.status(200)
        response.json(user)
    } else {

        response.status(404)
        response.json({ "message": "A palavra informada não foi encontrada" })
    }

})

app.get('/v1/senai/help', function (request, response) {

    let docAPI = {
        "API - description": "API para manipular dados de usuários e conversas de whatsApp",
        "date": "2026-04-15",
        "Development": "May Martins",
        "version": "1.0",
        "Endpoints": [
            {
                "id": 1,
                "Rota 1": "/v1/senai/whatsapp/contatos",
                "obs": "Retorna a lista de todos os usuarios",
            },
            {
                "id": 2,
                "Rota 2": "/v1/senai/whatsapp/usuario/:numero",
                "obs": "Retorna os dados do usuario filtrando pelo numero de telefone",
            },
            {
                "id": 3,
                "Rota 3": "/v1/senai/whatsapp/contato/:numero",
                "obs": "retornar os dados de cada contato de um usuario filtrando pelo numero de telefone",
            },
            {
                "id": 4,
                "Rota 4": "/v1/senai/whatsapp/conversa/usuario",
                "obs": "Retorna uma lista com todas as mensagens trocadas de uma conta de usuario filtrado primeiro pelo numero e posteriormente pelo contato do usuario",
            },
            {
                "id": 5,
                "Rota 5": "/v1/senai/whatsapp/mensagem",
                "obs": "Retorna uma lista de uma conversa filtrando por um numero de usuario e porteriormente por uma palavra chave",
            },
        ]
    }

    response.status(200)
    response.json(docAPI)
})



//serve para inicializar a API para receber requisições 
app.listen(8080, function () {
    console.log('API funcionando e aguardando novas requisisções...')
})
