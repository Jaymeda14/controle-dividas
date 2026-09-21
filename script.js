
let btnAdd = document.querySelector("#btn-add")
let btnCancelar = document.getElementById("btn-cancelar")
let divModal = document.getElementById("modal")
let btnSalvar = document.getElementById("btn-salvar")
let tabela = document.getElementById("tabela")
let corpoTabela = document.getElementById("corpoTabela")
let linhaTabela = document.getElementById("linhaTabela")
let total = document.getElementById("total")
let totalPago = document.getElementById("totalPago")
let totalAberto = document.getElementById("totalAberto")


let inputDia = document.getElementById("dia")
let inputNome = document.getElementById("nome")
let inputValor = document.getElementById("valor")

let dividas = []

 let titulo = document.getElementById("titulo")
 let data = new Date()
 let mesAtual = data.toLocaleString('pt-BR',{month: 'long'})
 mesAtual = mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1)
 titulo.innerText = `${mesAtual}/${data.getFullYear()}`

  



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

    dividas = buscarDividasOrdenadas()

    dividas.forEach(function(div, index){
        let tdDia = document.createElement("td")
        let tdNome = document.createElement("td")
        let tdValor = document.createElement("td")
        let tdBtn01 = document.createElement("td")
        let tdBtn02 = document.createElement("td")
        let tr = document.createElement("tr")
       

       

        if(div.paga){
             tr.classList.add("ativoTr")             
        }
        if(div.dia < 10){
            tdDia.innerText = `0${div.dia}`
        } else {
            tdDia.innerText = div.dia
        }
        tdNome.innerText = div.nome
        tdValor.innerText = div.valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
        tr.appendChild(tdDia)
        tr.appendChild(tdNome)
        tr.appendChild(tdValor)
        corpoTabela.appendChild(tr)

        let pagoPendente = document.createElement("button")
        pagoPendente.textContent = "✔"
        pagoPendente.addEventListener("click", function(){
            div.paga = !div.paga
            persistir()            
            renderizar()
        })
                
        let btnRemover = document.createElement("button")
        btnRemover.textContent = "X"
        btnRemover.addEventListener("click", function(){
            apagarNoStorage(index)
             
        })
        btnRemover.classList.add("btn-excluir")
        
        if(div.paga){
            pagoPendente.classList.add("btn-visto")
        }

        tdBtn01.appendChild(btnRemover)
        tdBtn02.appendChild(pagoPendente)

        tr.appendChild(tdBtn01)
        tr.appendChild(tdBtn02)
       
    });
        total.innerText = calcularTotal().toLocaleString('pt-BR', {style:'currency', currency:'BRL'})
        totalPago.innerText = calcularPago().toLocaleString('pt-BR', {style:'currency', currency:'BRL'})
        totalAberto.innerText = calcularEmAberto().toLocaleString('pt-BR', {style:'currency', currency:'BRL'})
}

renderizar() 

function buscarDividasOrdenadas(){
    let salvo = localStorage.getItem("dividas")
    let dividas = salvo? JSON.parse(salvo): []
    
    dividas.sort(function(a,b){
        return a.dia - b.dia
    })
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

function calcularTotal(){
    return dividas.reduce(function(acumulador, itemAtual){
        let valorTotal = acumulador + itemAtual.valor
        return valorTotal
    }, 0)    
}

function calcularPago(){
    let dividasPagas = []
    for(div of dividas){
        if(div.paga===true){
            dividasPagas.push(div) 
        }
    }
    return dividasPagas.reduce(function(acumulador, itemAtual){
        let valorPago = acumulador + itemAtual.valor
        return valorPago
    }, 0)
}

function calcularEmAberto(){
    let emAberto = []
    for(div of dividas){
        if(div.paga===false){
            emAberto.push(div)
        }
    }

    return emAberto.reduce(function(acumulador, itemAtual){
        let valorAberto = acumulador + itemAtual.valor
        return valorAberto
    }, 0)
}




