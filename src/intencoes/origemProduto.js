import fs from 'fs';

const dados = JSON.parse(
    fs.readFileSync('.//data/dados.json', 'utf8')
);

function fraseAleatoria(lista) {
    const indiceAleatorio = Math.floor(Math.random() * lista.length);
    return lista[indiceAleatorio];
}

export function origemProduto(resposta) {
    console.log(fraseAleatoria(dados.resposta.origemProduto));
}