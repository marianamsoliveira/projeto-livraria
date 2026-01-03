import { pegaLivros, adicionaLivro, removeLivro, buscaLivrosPorAutor, listarLivrosAposAno, salvaLivrosArquivo } from "./livraria.js";
import { menu, finaliza, le, textoAzul, textoVerde, menuSelecaoUsuario } from "./interface.js"


const itensMenu = [" Adicionar ", " Editar ", " Remover ", " Ver todos ", " Busca por autor ", " Listar por ano ", " Salvar no arquivo ", " Sair "]

let titulo, autor, ano, busca, lista, id

while (1) {
    const selecionado = await menu(itensMenu)
    switch (selecionado.trim().toLocaleLowerCase()) {
        case "adicionar":
            titulo = await le("\nInforme o título do livro: ")
            autor = await le("\nInforme o autor do livro: ")
            ano = await le("\nInforme o ano de publicação: ")
            adicionaLivro(titulo, autor, ano)
            textoVerde("Dados inseridos com sucesso!\n")
            break
        case "editar":
            id = await menuSelecaoUsuario(pegaLivros())
            titulo = await le("\nDigite o título atualizado: ")
            autor = await le("\nDigite o nome do autor atualizado: ")
            ano = await le("\nDigite o ano de publicação atualizado: ")
            adicionaLivro(titulo, autor, ano, id)
            textoVerde("Dados atualizados com sucesso!\n")
            break
        case "remover":
            id = await menuSelecaoUsuario(pegaLivros())
            removeLivro(id)
            textoVerde("Dados removidos com sucesso!\n")
            break
        case "ver todos":
            busca = pegaLivros()
            textoAzul(busca + "\n")
            break
        case "busca por autor":
            autor = await le("\nInforme o autor do livro: ")
            busca = buscaLivrosPorAutor(autor)
            textoAzul(busca + "\n")
            break
        case "listar por ano":
            ano = await le("\nA partir de qual ano de publicação? ")
            lista = listarLivrosAposAno(ano)
            textoAzul(lista + "\n")
            break
        case "salvar no arquivo":
            salvaLivrosArquivo()
            textoVerde("Dados salvos com sucesso!\n")
            break
        case "sair":
            finaliza()
            textoVerde("Até mais")
        default:
            console.log(`${selecionado.trim().toLocaleLowerCase()} não é válido.`)
    }
}




// console.log(pegaLivros())

// adicionaLivro('O empresário', 'Mariana Oliveira', 2025)
// adicionaLivro('A cruz e a Espada', 'Oliveira Alves', 2014)

// console.log(pegaLivros())

// removeLivro('O empresário')

// console.log(pegaLivros())

// console.log(buscaLivrosPorAutor("Cecília Meireles"))

// console.log(listarLivrosAposAno(1990))

// console.log(ordenarLivrosPorTitulo())

// salvaLivrosArquivo()
