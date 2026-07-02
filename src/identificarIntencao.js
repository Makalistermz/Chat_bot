import fs from 'fs';
import { verificarPalavra } from './verificarPalavras.js';

const dados = JSON.parse(
    fs.readFileSync('./json/dados.json', 'utf8')
);

const produtos = JSON.parse(
    fs.readFileSync('./json/produtos.json', 'utf8') 
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