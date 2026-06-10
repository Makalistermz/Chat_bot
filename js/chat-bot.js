const readline = require('readline');

const leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const fs = require('fs');

const dados = JSON.parse(
    fs.readFileSync('dados.json', 'utf8')
);


let data = new Date().toLocaleDateString('pt-BR');

const perguntas = {
    dia: ['dia', 'data', 'hoje'],
    cidade: ['cidade', 'município', 'capital']
}

const duvidas = {
    dia: data,
    cidade: 'Santa Maria de Jetibá'
}

const respFinal = {
    finalizar: ['não', 'certo']
}

function perguntar() {
    leitor.question('Oque posso ajudar?', (resposta) => {
    
        resposta = resposta.toLowerCase(); // reconhe maiscula como minusculas

        if (dados.perguntas.dia.some(p => resposta.includes(p))) { //O método ".includes()" verifica se uma string contém um determinado texto. O método ".some()" percorre o array e retorna true se pelo menos um item atender à condição.
            console.log(`Hoje é: ${duvidas.dia}`);
        } else if (dados.perguntas.cidade.some(p => resposta.includes(p))) {
            console.log(`A cidade que você está proucurando é ${duvidas.cidade}`)
        } else {
            console.log('Não entendi oque você quis dizer')
        }

        leitor.question('Mais alguma duvida?', (resposta) => {

            resposta = resposta.toLowerCase();

            if (dados.respFinal.finalizar.some(p => resposta.includes(p))){
                console.log('Ok obrigado!')

                leitor.close(); //usar dentro do ultimo leitor para não cortar os outros leitores
            } else {
                perguntar(); //retorna para a pergunta
            }
        });
    });

}

perguntar();