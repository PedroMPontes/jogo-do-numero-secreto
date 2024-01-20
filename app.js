//let titulo = document.querySelector('h2');
//titulo.innerHTML = "Jogo do número secreto";

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = "Digite um número de 1 a 10";
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {

    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});

}

function exibirMensagemIncial(){

    exibirTextoNaTela('h2', "Jogo do número secreto");
    exibirTextoNaTela('p', "Digite um número de 1 a 10");
}

exibirMensagemIncial();

function verificarChute() {

    let chute = document.querySelector('input').value;
    
    if(chute == numeroSecreto){
        exibirTextoNaTela('h2', 'acertou');
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemExito = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemExito);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', `o número é menor`);
        } else {
            exibirTextoNaTela('p', `o número é maior`);
        }
        limparTela();
    }

    tentativas++; 

}

function gerarNumeroAleatorio(){

    let numeroSorteado = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosDaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosDaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroSorteado)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroSorteado);
        return numeroSorteado;
    }
}

function limparTela(){
    chute = document.querySelector('input');
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparTela();
    tentativas = 1;
    exibirMensagemIncial();
    document.getElementById('reiniciar').setAttribute('disabled', true);   
}