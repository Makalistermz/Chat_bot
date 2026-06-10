const readline = require('readline');

const leitor = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let data = new Date().toLocaleDateString('pt-BR');

const duvidas = {
    dia: data,
    cidade: 'Santa Maria de Jetibá'
}

leitor.question('Oque posso ajudar?', (resposta) => {
    
    resposta = resposta.toLocaleLowerCase();

    if (resposta.includes('dia')) { //O método ".includes()" verifica se uma string contém um determinado texto.
        console.log(`Hoje é: ${duvidas.dia}`);
    } else if (resposta.includes('cidade')) {
        console.log(`A cidade que você está proucurando é ${duvidas.cidade}`)
    }

    leitor.close() //usar dentro do ultimo leitor para não cortar os outros leitores
})

