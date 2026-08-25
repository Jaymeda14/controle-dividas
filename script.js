
let btnAdd = document.querySelector("#btn-add")
let btnCancelar = document.getElementById("btn-cancelar")
let divModal = document.getElementById("modal")
let btnSalvar = document.getElementById("btn-salvar")
let tabela = document.getElementById("tabela")
let corpoTabela = document.getElementById("corpoTabela")
let linhaTabela = document.getElementById("linhaTabela")



let inputDia = document.getElementById("dia")
let inputNome = document.getElementById("nome")
let inputValor = document.getElementById("valor")

let dividas = []

btnAdd.addEventListener("click", function(){
   divModal.classList.add("ativo")
})
btnCancelar.addEventListener("click", function(){
    divModal.classList.remove("ativo")
})

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
    new Divida(Number(inputDia.value), inputNome.value, Number(inputValor.value), false)
    divModal.classList.remove("ativo")
    
    inputDia.value = ""
    inputNome.value = ""
    inputValor.value = ""  
    
    persistir()
    renderizar() 
})


function renderizar(){
    corpoTabela.innerText = ""

    dividas = buscarArrayDividas()

    dividas.forEach(function(div, index){
        let tdDia = document.createElement("td")
        let tdNome = document.createElement("td")
        let tdValor = document.createElement("td")
        let tdBtn01 = document.createElement("td")
        let tdBtn02 = document.createElement("td")
        let tr = document.createElement("tr")
           
        if(div.dia < 10){
            tdDia.innerText = `0${div.dia}`
        } else {
            tdDia.innerText = div.dia
        }
        tdNome.innerText = div.nome
        tdValor.innerText = `R$ ${div.valor},00`
        tr.appendChild(tdDia)
        tr.appendChild(tdNome)
        tr.appendChild(tdValor)
        corpoTabela.appendChild(tr)

        let pagoPendente = document.createElement("button")
        pagoPendente.textContent = "Visto"
        pagoPendente.addEventListener("click", function(){
            tr.classList.toggle("ativoTr")
        })
        
        
        let btnRemover = document.createElement("button")
        btnRemover.textContent = "X"
        btnRemover.addEventListener("click", function(){
            apagarNoStorage(index)
        })
        btnRemover.classList.add("btn-excluir")
        pagoPendente.classList.add("btn-visto")
        tdBtn01.appendChild(btnRemover)
        tdBtn02.appendChild(pagoPendente)

        tr.appendChild(tdBtn01)
        tr.appendChild(tdBtn02)
       
    });
}

renderizar() 

function buscarArrayDividas(){
    let salvo = localStorage.getItem("dividas")
    let dividas = salvo? JSON.parse(salvo): []
    return dividas
}

function persistir(){
    localStorage.setItem("dividas", JSON.stringify(dividas))
}

function apagarNoStorage(index){
    dividas.splice(index, 1)
    persistir()
    renderizar()
}