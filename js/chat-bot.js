const readline = require('readline');
const fs = require('fs');
const open = require('open').default;  //Biblioteca responsavel por abrir o whatsapp
const natural = require('natural');

const leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const dados = JSON.parse(
    fs.readFileSync('../json/dados.json', 'utf8')
);

const historico = JSON.parse(
    fs.readFileSync('../json/historico.json', 'utf8')
);

const numeroSuporte = '5527995128081'  //numero que vai ser aberto
const mensagem = 'Olá, Gostaria de falar com o suporte!'  //mensagem do whatsapp

const linkWhatsapp = `https://wa.me/${numeroSuporte}?text=${encodeURIComponent(mensagem)}`;  //link para abrir o whatsapp

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

//console.log(
//    natural.JaroWinklerDistance(
//        'suporte',
//        'supoorte'
//    )
//);

function verificarPalavra(resposta, listaPalavras) {
    const palavrasDigitadas = resposta.split(' '); //Separar a frase em palavras

    return listaPalavras.some(palavraChave => {
        return palavrasDigitadas.some(palavraDigitada => {
            const similaridade = natural.JaroWinklerDistance(  //Calcular a similaridade
                palavraDigitada,
                palavraChave
            );
            return resposta.includes(palavraChave) || similaridade >= 0.85;
        });
    });
}

function perguntar() {
    leitor.question(obterSaudacao(), (resposta) => {  //chamei "obterSaudacao()" para retornar a frase do JSON.
    
        resposta = resposta.toLowerCase();  // reconhece maiúscula como minusculas

        if (verificarPalavra(resposta, dados.palavrasChave.dia)) {  //O método ".includes()" verifica se uma string contém um determinado texto. O método ".some()" percorre o array e retorna true se pelo menos um item atender à condição.
            console.log(`Hoje é: ${duvidas.dia}`);
            perguntarDenovo()

        } else if (verificarPalavra(resposta, dados.palavrasChave.cidade)) {
            console.log(`A cidade que você está proucurando é ${duvidas.cidade}`)
            perguntarDenovo()

        } else if (verificarPalavra(resposta, dados.palavrasChave.suporte)) {
            console.log('Abrindo Whatsapp do suporte...');
            open(linkWhatsapp);  //resposavel por abrir o whatsapp
            perguntarDenovo()

        } else {
            console.log('Não entendi oque você quis dizer')
            
            leitor.question(
                'Essa pergunta é sobre:\n1. Dia\n2. Cidade\n3. Suporte\nEscolha uma opção: ', 
                (categoria) => {
                    if (categoria === '1') {
                        dados.palavrasChave.dia.push(resposta)
                    } else if (categoria === '2') {
                        dados.palavrasChave.cidade.push(resposta)
                    } else if (categoria === '3') {
                        dados.palavrasChave.suporte.push(resposta)
                    } else {
                        console.log('Opção inválida.');
                        perguntar();
                        return;
                    }
                    
                    fs.writeFileSync(  // salva a pergunta do user no JON
                        '../json/dados.json',
                        JSON.stringify(dados, null, 4)
                    );

                    perguntarDenovo()

                }
            );

            return;
        }
    });

}

function perguntarDenovo() {
    leitor.question('Mais alguma duvida?', (resposta) => {

        resposta = resposta.toLowerCase();

        if (dados.respFinal.finalizar.some(p => resposta.includes(p))){
            console.log('Ok obrigado!')

            leitor.close();  //usar dentro do ultimo leitor para não cortar os outros leitores

        } else {
            perguntar();  //retorna para a pergunta
        }
    });
}

perguntar();