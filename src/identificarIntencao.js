import fs from 'fs';
import { verificarPalavra } from './utils/verificarPalavras.js';

const dados = JSON.parse(
    fs.readFileSync('./data/dados.json', 'utf8')
);

const produtos = JSON.parse(
    fs.readFileSync('./data/produtos.json', 'utf8') 
);

function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function pontuacaoIntencao(resposta, palavrasChave) {
    let pontuacao = 0;

    const respostaNormalizada = normalizarTexto(resposta);

    for (const palavraChave of palavrasChave) {
        const palavraChaveNormalizada = normalizarTexto(palavraChave);

        if (respostaNormalizada.includes(palavraChaveNormalizada)) {
            if (palavraChaveNormalizada.includes(' ')) {
                pontuacao += 3;
            } else {
                pontuacao += 1;
            }
        }
    }

    return pontuacao;
}

export function identificarIntencao(resposta) {
    let melhorIntencao = null;
    let maiorPontuacao = 0;

    for (const intencao in dados.intencoes) {
        const pontuacao = pontuacaoIntencao(
            resposta,
            dados.intencoes[intencao]
        );

        if (pontuacao > maiorPontuacao) {
            maiorPontuacao = pontuacao;
            melhorIntencao = intencao;
        }
    }

    return melhorIntencao;
}