/*
        Recomendar perfumes proxima atualização por categoria, ex: "Quero um perfume doce"
*/
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

const produtos = JSON.parse(
    fs.readFileSync('../json/produtos.json', 'utf8') 
);

const numeroSuporte = '5527995128081'
const mensagem = 'Olá, Gostaria de falar com o suporte!'

const linkWhatsapp = `https://wa.me/${numeroSuporte}?text=${encodeURIComponent(mensagem)}`;

let data = new Date().toLocaleDateString('pt-BR');

const duvidas = {
    dia: data
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

//console.log(  Exemplo de como funciona o JaroWinklerDistance
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

function fraseAleatoria(lista) {
    const indiceAleatorio = Math.floor(Math.random() * lista.length);
    return lista[indiceAleatorio];
}

function perguntar() {
    leitor.question(obterSaudacao(), (resposta) => {  //chamei "obterSaudacao()" para retornar a frase do JSON.
    
        resposta = resposta.toLowerCase();  // reconhece maiúscula como minusculas

        function identificarPerfume(resposta) {
            for (const perfume in produtos.perfumes) {
                if (resposta.includes(perfume)) {
                return produtos.perfumes[perfume];
            }
        }
        return null;
        }

        const perfumeEncontrado = identificarPerfume(resposta);

        if (verificarPalavra(resposta, dados.palavrasChave.dia)) {  //O método ".includes()" verifica se uma string contém um determinado texto. O método ".some()" percorre o array e retorna true se pelo menos um item atender à condição.
            console.log(`Hoje é: ${duvidas.dia}`);
            perguntarDenovo()

        } else if (verificarPalavra(resposta, dados.palavrasChave.origemProduto)) {
            console.log(fraseAleatoria(dados.resposta.origemProduto))
            perguntarDenovo()

        } else if (verificarPalavra(resposta, dados.palavrasChave.suporte)) {
            console.log('Abrindo Whatsapp do suporte...');
            open(linkWhatsapp);  //resposavel por abrir o whatsapp
            perguntarDenovo()

        } else if(verificarPalavra(resposta, dados.palavrasChave.valor)) {
            console.log(
                `O perfume ${perfumeEncontrado.nome} custa APENAS! R$ ${perfumeEncontrado.preco.toFixed(2)}`
            ) //toFixed(2) serve para formatar números decimais
            
            perguntarDenovo()
        
        } else {
            console.log('Não entendi oque você quis dizer')
            
            leitor.question(
                'Essa pergunta é sobre:\n1. Dia\n2. Origem do Produto\n3. Suporte\n4. Valor do produto\nEscolha uma opção: ', 
                (categoria) => {
                    if (categoria === '1') {
                        dados.palavrasChave.dia.push(resposta)
                    } else if (categoria === '2') {
                        dados.palavrasChave.origemProduto.push(resposta)
                    } else if (categoria === '3') {
                        dados.palavrasChave.suporte.push(resposta)
                    } else if (categoria === '4') {
                        dados.palavraChave.valor.push(resposta)
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