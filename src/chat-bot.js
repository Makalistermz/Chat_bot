import { createInterface } from 'readline';
import fs from 'fs';
import { identificarIntencao } from './identificarIntencao.js';
import { suporte } from './/intencoes/suporte.js';
import { origemProduto } from './/intencoes/origemProduto.js';
import { consultarPreco } from './/intencoes/consultarPreco.js';
import { indicarCategoria } from './intencoes/indicarCategoria.js';
import { verificarEstoque } from './intencoes/verificarEstoque.js';
import { perguntaInteligente } from './services/pergunta_inteligente.js';
import { 
        ultimasResposta,
        resolverRespostaComContexto,
        contexto 
    } from './historico.js';

const leitor = createInterface({
    input: process.stdin,
    output: process.stdout
})

const dados = JSON.parse(
    fs.readFileSync('./data/dados.json', 'utf8')
);

let data = new Date().toLocaleDateString('pt-BR');

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

function fraseAleatoria(lista) {
    const indiceAleatorio = Math.floor(Math.random() * lista.length);
    return lista[indiceAleatorio];
}

function iniciarChat() {
    console.log(obterSaudacao());
    perguntar();
}

function perguntar() {
    leitor.question('\nVocê: ', async (resposta) => {
        await respostas(resposta);
    });
}

async function respostas(resposta) {
    resposta = resposta.toLowerCase();

    if (['obrigado', 'obrigada', 'valeu', 'tchau', 'sair']
        .some(p => resposta.includes(p))) {
        console.log('De nada! Até mais.');
        leitor.close();
        return;
    }

    // Atualiza o último perfume mencionado.
    ultimasResposta(resposta);

    // Resolve "ele", "esse", etc. antes de enviar ao Gemini.
    resposta = resolverRespostaComContexto(resposta, contexto);

    const intencao = identificarIntencao(resposta);

    switch (intencao) {
        case 'suporte':
            suporte(resposta);
            break;

        case 'origem_produto':
            origemProduto(resposta);
            break;

        case 'categoria':
            indicarCategoria(resposta);
            break;

        // Preço, estoque e perguntas abertas vão para o Gemini.
        // Ele poderá solicitar consultar_produto quando precisar.
        default:
            await perguntaInteligente(resposta);
            break;
    }

    perguntar();
}

iniciarChat();