/*******************************************************************************************
 * Objetivo: Arquivo responsável pelas funções de pesquisar informações do projeto whatsApp
 * Data: 08/04/2026
 * Autor: May
 * Versão: 1.0
 *******************************************************************************************/

import { contatos } from "./contatos.js"

//Função para Listar todos os dados de usuário independente do numero
//esta função não possui parametro 
//é para retornar todos os dados da API, literalmente todos
const getListarContatos = function () {
    let lista = contatos

    if (lista) {
        return lista["whats-users"]
    }
    else {
        return false
    }
}

//Função para Listar dados da conta do profile do usuário
//função que usa parametro de numero
const getListarDadosDaConta = function (numero) {
    let lista = contatos
    let listaDeContatos = []
    let status = false

    lista["whats-users"].forEach(function (dadosUsuarios) {

        //condicional para verificar se o numero é igual ao numero de usuário dentro da api
        //replace para que ignore ponto, traços e virgulas e letras
        if (String(numero).replace(/\D/g, '') == dadosUsuarios.number) {

            listaDeContatos.push({
                nome: dadosUsuarios.account,
                nomeUsuario: dadosUsuarios.nickname,
                dataCriacao: dadosUsuarios["created-since"],
                imagem: dadosUsuarios["profile-image"],
                numero: dadosUsuarios.number,
                corDeFundo: dadosUsuarios.background
            })

            status = true
        }

    })

    if (!status) {
        return false
    } else {
        return listaDeContatos
    }
}

//Funcao que retorna os dados de cada contato de um numero
//esta funcao é bem parecida com a anterior o que muda é que precisa percorrer o atibuto contacts
const getListarDadosDeContato = function (numero) {
    let lista = contatos
    let listaDeContatos = []
    let status = false

    lista["whats-users"].forEach(function (dadosUsuarios) {

        //condicional para verificar se o numero é igual ao numero de usuário dentro da api
        //replace para que ignore ponto, traços e virgulas e letras
        if (String(numero).replace(/\D/g, '') == dadosUsuarios.number) {

            dadosUsuarios.contacts.forEach(function (contatoUsuario) {
                listaDeContatos.push({
                    nome: contatoUsuario.name,
                    foto: contatoUsuario.image,
                    descricao: contatoUsuario.description
                })
            })

            status = true
        }
    })

    if (!status) {
        return false
    } else {
        return listaDeContatos
    }
}

//funçao para listar todas as mensagens  trocadas de uma conta de usuario
//neste função não necessariamente irá percorrer mais de uma vez, pois no enunciado pede todas as informações do usuarios e das mensagens trocadas
const getListarMensagensUsuarios = function (numero) {
    let lista = contatos
    let listaDeMensagens = []
    let status = false

    lista["whats-users"].forEach(function (dadosUsuarios) {

        if (String(numero).replace(/\D/g, '') == dadosUsuarios.number) {

            status = true
            return listaDeMensagens.push(dadosUsuarios)
        }
    })

    if (!status) {
        return false
    } else {
        return listaDeMensagens
    }
}

//Listar uma conversa de um usuário e um contato(Retornar dados como: nome, número de celular e as
//conversas). Deve obrigatoriamente encaminhar a referência para encontrar a conversa via Query e não via parâmetro)
//nesta função primeiro percorre a lista de usuarios, posteriormente percorre os contatos deste usuario e 
//posteriormente uma condicional para comparar o numero e nome dos parametros e verifica se condiz com o que está registrado
//e por fim percorre as mensagens e retorna o nome, celular, remetente e as conversas. 
const getListarConversasUsuarios = function (numero, nomeUsuario) {
    let lista = contatos
    let status = false
    let listaDeMensagens = []
    let listarConversas = {}

    lista["whats-users"].forEach(function (dadosUsuarios) {

        dadosUsuarios.contacts.forEach(function (mensagensUsuario) {

            if (String(numero).replace(/\D/g, '') == dadosUsuarios.number && String(nomeUsuario).toLowerCase() == String(mensagensUsuario.name).toLowerCase()) {
                listarConversas.usuario = dadosUsuarios.account
                listarConversas.numero = dadosUsuarios.number
                status = true
                mensagensUsuario.messages.forEach(function (conversa) {
                    listaDeMensagens.push(conversa)

                })
                listarConversas.mensagens = listaDeMensagens
            }
        })
    })

    if (!status) {
        return false
    } else {
        return listarConversas
    }
}

//Realizar um filtro como “pesquisa de palavra chave” com base em uma palavra nas conversas do usuário e do respectivo contato

const getListarPalavraChave = function (numero, palavraChave) {
    let lista = contatos
    let listaDeConversas = []
    let status = false
    let listarConversas = {}

    lista["whats-users"].forEach(function (dadosUsuarios) {
        dadosUsuarios.contacts.forEach(function (mensagensUsuario) {
            mensagensUsuario.messages.forEach(function (conversa) {
                if (String(numero).replace(/\D/g, '') == dadosUsuarios.number && (String(conversa.content.toLowerCase())).includes(String(palavraChave).toLowerCase())) {
                    listarConversas.usuario = dadosUsuarios.account
                    listarConversas.numero = dadosUsuarios.number
                    status = true
                    listaDeConversas.push({
                        nome: conversa.sender,
                        horario: conversa.time,
                        conversa: conversa.content
                    })
                }
            })

            listarConversas.mensagens = listaDeConversas
        })
    })

    if (!status) {
        return false
    } else {
        return listarConversas
    }
}

export {
    getListarContatos,
    getListarDadosDaConta,
    getListarDadosDeContato,
    getListarMensagensUsuarios,
    getListarConversasUsuarios,
    getListarPalavraChave
}