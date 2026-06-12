import fs from 'fs';
import { perguntarDenovo } from '../chat-bot.js';

const dados = JSON.parse(
    fs.readFileSync('.//json/dados.json', 'utf8')
);

function fraseAleatoria(lista) {
    const indiceAleatorio = Math.floor(Math.random() * lista.length);
    return lista[indiceAleatorio];
}

export function origemProduto(resposta) {
    console.log(fraseAleatoria(dados.resposta.origemProduto));
    perguntarDenovo()
}