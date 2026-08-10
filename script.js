
let btnAdd = document.querySelector("#btn-add")
let btnCancelar = document.getElementById("btn-cancelar")
let divModal = document.getElementById("modal")
let btnSalvar = document.getElementById("btn-salvar")
let tabela = document.getElementById("tabela")
let corpoTabela = document.getElementById("corpoTabela")
let linhaTabela = document.getElementById("linhaTabela")

btnAdd.addEventListener("click", function(){
   divModal.classList.add("ativo")
})
btnCancelar.addEventListener("click", function(){
    divModal.classList.remove("ativo")
})
let inputDia = document.getElementById("dia")
let inputNome = document.getElementById("nome")
let inputValor = document.getElementById("valor")

let dividas = []

class Divida {
    constructor(dia, nome, valor, paga){
        this.dia = dia;
        this.nome = nome;
        this.valor = valor;
        this.paga = paga;
        dividas.push(this)
    }
}

btnSalvar.addEventListener("click", function(){
    new Divida(inputDia.value, inputNome.value, inputValor.value, false)
    divModal.classList.remove("ativo")
    //console.log(dividas)
    inputDia.value = ""
    inputNome.value = ""
    inputValor.value = ""  
    console.log(dividas) 
    mostrarTabela() 
})
let divida1 = new Divida (5, "Pensão", 600, false)
let divida2 = new Divida (10, "Financiamento", 550, false)
let divida3 = new Divida (15, "Sea Telecom", 190, false)

function mostrarTabela(){
    corpoTabela.innerText = ""
    for (div of dividas){
        let tdDia = document.createElement("td")
        let tdNome = document.createElement("td")
        let tdValor = document.createElement("td")
        let tr = document.createElement("tr")
        tdDia.innerText = div.dia
        tdNome.innerText = div.nome
        tdValor.innerText = div.valor
        tr.appendChild(tdDia)
        tr.appendChild(tdNome)
        tr.appendChild(tdValor)
        corpoTabela.appendChild(tr)
    }
}

mostrarTabela() 