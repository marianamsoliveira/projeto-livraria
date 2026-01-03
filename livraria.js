import fs from "fs"
import { v4 as uuidv4 } from "uuid"

let livros = _carregaLivros()

function _carregaLivros() {
    const dadosJSON = fs.readFileSync("livraria.json", "utf8")
    const dados = JSON.parse(dadosJSON)
    return dados
}

export function pegaLivros() {
    const livrosImprimiveis = livros.map(livro => `\nId: ${livro.id}, Título: ${livro.titulo}, Autor: ${livro.autor}, Publicado em: ${livro.ano}`)
    return livrosImprimiveis
}

export function listarLivrosAposAno(ano) {
    if (ano) {
        const livrosImprimiveis = livros.filter(livro => +livro.ano >= +ano).map(livro => `\nId: ${livro.id}, Título: ${livro.titulo}, Autor: ${livro.autor}, Publicado em: ${livro.ano}`)
        if (livrosImprimiveis.length > 0) {
            return livrosImprimiveis
        }
        else {
            return `Ano: ${ano}\nNenhum livro encontrado`
        }
    }
    else {
        return 'Ano não informado'
    }
}
export function buscaLivrosPorAutor(autor) {
    if (autor) {
        let livrosEncontrados
        livrosEncontrados = livros.filter(livro => livro.autor === autor).map(livro => `\nId: ${livro.id}, Título: ${livro.titulo}, Autor: ${livro.autor}, Publicado em: ${livro.ano}`)
        if (livrosEncontrados.length > 0) {
            return livrosEncontrados
        } else {
            return `Autor: ${autor}\nNenhum livro encontrado`
        }
    } else {
        return "Autor não informado"
    }
}

export function _ordenarLivrosPorTitulo(livros) {
    return livros.sort((a, b) => a.titulo.localeCompare(b.titulo))
}

export function adicionaLivro(titulo, autor, ano, id) {
    const indice = livros.findIndex(livro => livro.id === id)
    if (indice >= 0) {
        livros[indice].titulo = titulo
        livros[indice].autor = autor
        livros[indice].ano = +ano
    } else {
        const idUnico = uuidv4()
        ano = +ano
        livros.push({ id: idUnico, titulo, autor, ano })
    }
}


export function removeLivro(id) {
    const novoLivro = livros.filter(livro => livro.id != id)
    livros = novoLivro
}

export function salvaLivrosArquivo() {
    const dadosJSON = JSON.stringify(_ordenarLivrosPorTitulo(livros), null, 4)
    fs.writeFileSync("livraria.json", dadosJSON, "utf8")
}
