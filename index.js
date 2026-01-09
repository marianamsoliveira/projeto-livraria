import { cadastrarLivro, excluirLivro, excluirLivroAutor, listaLivros, buscaLivrosPorAutor, buscaLivrosAposAno, salvaLivrosArquivo } from "./livraria.js";
import { cadastrarAutor, excluirAutor, listaAutores, buscaAutoresPorNacionalidade, salvaAutoresArquivo, buscaAutor } from "./autores.js";
import { menu, subMenu, finaliza, le, textoAzul, textoVerde, menuSelecaoUsuario, textoPadrao, voltar } from "./interface.js"


const itensMenuPrincipal = [" ✍️ Autores ", " 📚 Livros ", " 🔍 Consultas ", " 💾 Salvar no Arquivo ", " ❌ Sair "]

const itensSubMenuAutores = [" Cadastrar ", " Editar ", " Excluir ", " Listar ", " ↩ "]

const itensSubMenuLivros = [" Cadastrar ", " Editar ", " Excluir ", " Listar ", " ↩ "]

const itensSubMenuConsultas = [" Livros por autor ", " Livros publicados a partir do ano ", " Autores por nacionalidade ", " ↩ "]

let titulo, autor, ano, busca, lista, id, nome, nacionalidade, autorEncontrado

while (1) {
    const selecionado = await menu(itensMenuPrincipal)
    switch (selecionado.trim().toLocaleLowerCase()) {

        case "✍️ autores":
            const selecionadoSubMenuAutores = await subMenu(itensSubMenuAutores)
            switch (selecionadoSubMenuAutores.trim().toLocaleLowerCase()) {
                case "cadastrar":
                    nome = await le("\nInforme o nome completo do autor: ")
                    nacionalidade = await le("\nInforme a nacionalidade: ")
                    cadastrarAutor(nome, nacionalidade)
                    textoVerde("Dados cadastrados com sucesso!")
                    break
                case "editar":
                    id = await menuSelecaoUsuario(listaAutores())
                    nome = await le("\nInforme o nome completo do autor: ")
                    nacionalidade = await le("\nInforme a nacionalidade: ")
                    cadastrarAutor(nome, nacionalidade, id)
                    textoVerde("Dados editados com sucesso!")
                    break
                case "excluir":
                    id = await menuSelecaoUsuario(listaAutores())
                    excluirAutor(id)
                    excluirLivroAutor(id)
                    textoVerde("Dados excluidos com sucesso!")
                    break
                case "listar":
                    busca = listaAutores()
                    textoAzul(busca)
                    break
                case "↩":
                    voltar()
                    break
            }
            break
        case "📚 livros":
            const selecionadoSubMenuLivros = await subMenu(itensSubMenuLivros)
            switch (selecionadoSubMenuLivros.trim().toLocaleLowerCase()) {
                case "cadastrar":
                    titulo = await le("\nInforme o título do livro: ")
                    textoPadrao("Selecione o autor: ")
                    autor = await menuSelecaoUsuario(listaAutores())
                    ano = await le("\nInforme o ano de publicação: ")
                    cadastrarLivro(titulo, autor, ano)
                    textoVerde("Dados cadastrados com sucesso!")
                    break
                case "editar":
                    id = await menuSelecaoUsuario(listaLivros())
                    titulo = await le("\nInforme o título atualizado: ")
                    textoPadrao("Selecione o autor: ")
                    autor = await menuSelecaoUsuario(listaAutores())
                    ano = await le("\nInforme o ano de publicação atualizado: ")
                    cadastrarLivro(titulo, autor, ano, id)
                    textoVerde("Dados editados com sucesso!")
                    break
                case "excluir":
                    id = await menuSelecaoUsuario(listaLivros())
                    excluirLivro(id)
                    textoVerde("Dados excluídos com sucesso!")
                    break
                case "listar":
                    busca = listaLivros()
                    textoAzul(busca)
                    break
                case "↩":
                    voltar()
                    break
            }
            break
        case "🔍 consultas":
            const selecionadoSubMenuConsultas = await subMenu(itensSubMenuConsultas)
            switch (selecionadoSubMenuConsultas.trim().toLocaleLowerCase()) {
                case "livros por autor":
                    autor = await le("\nInforme o nome do autor: ")
                    autorEncontrado = await buscaAutor(autor)
                    if(typeof autorEncontrado==="object"){
                        busca = buscaLivrosPorAutor(autorEncontrado[0].id, autorEncontrado[0].nome)
                        textoAzul(busca)
                    }else{
                        textoAzul(autorEncontrado)
                    }
                    
                    break
                case "livros publicados a partir do ano":
                    ano = await le("\nA partir de qual ano de publicação? ")
                    lista = buscaLivrosAposAno(ano)
                    textoAzul(lista)
                    break
                case "autores por nacionalidade":
                    nacionalidade = await le("\nA partir de qual nacionalidade de publicação? ")
                    lista = buscaAutoresPorNacionalidade(nacionalidade)
                    textoAzul(lista)
                    break
                case "↩":
                    voltar()
                    break
            }
            break
        case "💾 salvar no arquivo":
            salvaLivrosArquivo()
            salvaAutoresArquivo()
            textoVerde("Dados salvos com sucesso!")
            break
        case "❌ sair":
            finaliza()
        default:
            console.log(`${selecionado.trim().toLocaleLowerCase()} não é válido.`)
    }
}
