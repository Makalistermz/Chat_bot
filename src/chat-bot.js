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

    const resultado = ultimasResposta(resposta);

    const palavrasGemini = [
        'melhor',
        'descrição',
        'descricao',
        'notas',
        'olfativas',
        'fixação',
        'fixacao',
        'projeção',
        'projecao', 
        'parece',
        'parecido',
        'semelhante',
        'vale a pena'
    ];

    if (palavrasGemini.some(p => resposta.includes(p))) {
        await perguntaInteligente(resposta);
        perguntar();
        return;
    }

    resposta = resposta.toLowerCase();  // reconhece maiúscula como minusculas

    if (['obrigado', 'obrigada', 'valeu', 'tchau', 'sair'].some(p => resposta.includes(p))) {
        console.log('De nada! Até mais.');
        leitor.close();
        return;
    }

    resposta = resolverRespostaComContexto(resposta, contexto);

    const intencao = identificarIntencao(resposta);
    
    switch (intencao) {
        case 'suporte':
            suporte(resposta);
            break
        case 'origem_produto':
            origemProduto(resposta);
            break
        case 'consultar_preco': 
            consultarPreco(resposta);
            break
        case 'categoria':
            indicarCategoria(resposta);
            break
        case 'estoque':
            verificarEstoque(resposta);
            break
        default:
            await perguntaInteligente(resposta);
            break
    }
    perguntar();
}

iniciarChat();