import fs from "fs"
import { v4 as uuidv4 } from "uuid"


let autores = _carregaAutores()

function _carregaAutores() {
    const dadosJSON = fs.readFileSync("autores.json", "utf8")
    const dados = JSON.parse(dadosJSON)
    return dados
}

export function listaAutores() {
    const autoresImprimiveis = autores.map(autor => `\nId: ${autor.id}, Nome: ${autor.nome}, Nacionalidade: ${autor.nacionalidade}`)
    return autoresImprimiveis
}

export function buscaAutor(nome) {
    if(nome){
        const autorEncontrado = autores.filter(autor => autor.nome.includes(nome))
        if(autorEncontrado.length>0){
            return autorEncontrado
        }else{
            return `Autor: ${nome}\nNenhum livro encontrado.`
        }
    }else{
        return 'Autor não informado.'
    }
}

export function buscaAutoresPorNacionalidade(nacionalidade) {
    if (nacionalidade) {
        let autoresEncontrados
        autoresEncontrados = autores.filter(autor => autor.nacionalidade === nacionalidade).map(autor => `\nId: ${autor.id}, Nome: ${autor.nome}`)
        if (autoresEncontrados.length > 0) {
            return autoresEncontrados
        } else {
            return `Nacionalidade: ${nacionalidade}\nNenhum autor encontrado.`
        }
    } else {
        return "Nacionalidade não informada."
    }
}

export function _ordenarAutores(autores) {
    return autores.sort((a, b) => a.nome.localeCompare(b.nome))
}

export function cadastrarAutor(nome, nacionalidade, id) {
    const indice = autores.findIndex(autor => autor.id === id)
    if (indice >= 0) {
        autores[indice].nome = nome
        autores[indice].nacionalidade = nacionalidade
    } else {
        const idUnico = uuidv4()
        autores.push({ id: idUnico, nome, nacionalidade })
    }
}


export function excluirAutor(id) {
    const novoAutor = autores.filter(autor => autor.id != id)
    autores = novoAutor
}

export function salvaAutoresArquivo() {
    const dadosJSON = JSON.stringify(_ordenarAutores(autores), null, 3)
    fs.writeFileSync("autores.json", dadosJSON, "utf8")
}

