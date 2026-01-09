import kit from "terminal-kit"

const term = kit.terminal

export async function menu(itens) {
    let options = {
        style: term.inverse,
        selectedStyle: term.white.bgCyan
    }
    const opcaoSelecionada = await term.singleLineMenu(itens, options).promise
    return opcaoSelecionada.selectedText
}

export async function subMenu(itens) {
    let options = {
        style: term.bgCyan.white,
        selectedStyle: term.white.bgGray
    }
    const opcaoSelecionada = await term.singleLineMenu(itens, options).promise
    return opcaoSelecionada.selectedText
}




export async function menuSelecaoUsuario(itens) {
    let options = {
        // style: term.inverse,
        selectedStyle: term.white.bgGray
    }

    const selecionada = await term.singleColumnMenu(itens, options).promise
    const id = selecionada.selectedText.split(",")[0].replace("Id: ", "").trim()
    return id
}

export async function le(enunciado) {
    term(`\n${enunciado}`)
    const foiLido = await term.inputField().promise
    return foiLido
}

export function textoPadrao(texto){
    term(`${texto}`)
}
export function textoVerde(texto){
    term.green(`\n\n${texto}\n`)
}
export function textoAzul(texto){
    term.blue(`\n\n${texto}\n`)
}

export function finaliza(){
    process.exit()
}

export function voltar(){
    term.clear()
}