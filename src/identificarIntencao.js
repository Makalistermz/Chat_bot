import fs from 'fs';
import { verificarPalavra } from './verificarPalavras.js';

const dados = JSON.parse(
    fs.readFileSync('./json/dados.json', 'utf8')
);

const produtos = JSON.parse(
    fs.readFileSync('./json/produtos.json', 'utf8') 
);

export function identificarIntencao(resposta) {

    for (const intencao in dados.intencoes) {
        if (verificarPalavra(resposta, dados.intencoes[intencao])) {
            return intencao;
        }
    }
    return null

}