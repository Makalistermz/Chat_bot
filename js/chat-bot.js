const readline = require('readline');
const open = require('open').default;  //Biblioteca responsavel por abrir o whatsapp

const leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const fs = require('fs');

const numeroSuporte = '5527995128081'  //numero que vai ser aberto
const mensagem = 'Olá, Gostaria de falar com o suporte!'  //mensagem do whatsapp

const linkWhatsapp = `https://wa.me/${numeroSuporte}?text=${encodeURIComponent(mensagem)}`;  //link para abrir o whatsapp

const dados = JSON.parse(
    fs.readFileSync('../json/dados.json', 'utf8')
);

let data = new Date().toLocaleDateString('pt-BR');

const duvidas = {
    dia: data,
    cidade: 'Santa Maria de Jetibá'
}

let identificarSaudacao = new Date();

let hora = identificarSaudacao.getHours();

function obterSaudacao() {
    if (hora >= 4 && hora < 12  ) {
        return dados.saudacao.manha
    } else if (hora >= 12 && hora < 18) {
        return dados.saudacao.tarde
    } else {
        return dados.saudacao.noite
    }
}

function perguntar() {
    leitor.question(obterSaudacao(), (resposta) => {  //chamei "obterSaudacao()" para retornar a frase do JSON.
    
        resposta = resposta.toLowerCase();  // reconhece maiúscula como minusculas

        if (dados.perguntas.dia.some(p => resposta.includes(p))) {  //O método ".includes()" verifica se uma string contém um determinado texto. O método ".some()" percorre o array e retorna true se pelo menos um item atender à condição.
            console.log(`Hoje é: ${duvidas.dia}`);

        } else if (dados.perguntas.cidade.some(p => resposta.includes(p))) {
            console.log(`A cidade que você está proucurando é ${duvidas.cidade}`)

        } else if (dados.perguntas.suporte.some(p => resposta.includes(p))) {
            console.log('Abrindo Whatsapp do suporte...');
            open(linkWhatsapp);  //resposavel por abrir o whatsapp

        } else {
            console.log('Não entendi oque você quis dizer')
        }

        leitor.question('Mais alguma duvida?', (resposta) => {

            resposta = resposta.toLowerCase();

            if (dados.respFinal.finalizar.some(p => resposta.includes(p))){
                console.log('Ok obrigado!')

                leitor.close();  //usar dentro do ultimo leitor para não cortar os outros leitores

            } else {
                perguntar();  //retorna para a pergunta
            }
        });
    });

}

perguntar();