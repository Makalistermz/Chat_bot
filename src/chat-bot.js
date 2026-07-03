import { createInterface } from 'readline';
import fs from 'fs';
import open from 'open';  //Biblioteca responsavel por abrir o whatsapp
import { identificarPerfume } from './identificarPerfume.js';
import { verificarPalavra } from './verificarPalavras.js';
import { identificarIntencao } from './identificarIntencao.js';
import { suporte } from './/intencoes/suporte.js';
import { origemProduto } from './/intencoes/origemProduto.js';
import { consultarPreco } from './/intencoes/consultarPreco.js';
import { indicarCategoria } from './intencoes/indicarCategoria.js';
import { verificarEstoque } from './intencoes/verificarEstoque.js';
import { perguntaInteligente } from './intencoes/pergunta_inteligente.js';

const leitor = createInterface({
    input: process.stdin,
    output: process.stdout
})

const dados = JSON.parse(
    fs.readFileSync('./json/dados.json', 'utf8')
);

const produtos = JSON.parse(
    fs.readFileSync('./json/produtos.json', 'utf8') 
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

function fraseAleatoria(lista) {
    const indiceAleatorio = Math.floor(Math.random() * lista.length);
    return lista[indiceAleatorio];
}

function perguntar() {
    leitor.question(obterSaudacao(), (resposta) => {  //chamei "obterSaudacao()" para retornar a frase do JSON.

        respostas(resposta);

    })
}

async function respostas(resposta) {

    resposta = resposta.toLowerCase();  // reconhece maiúscula como minusculas

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
    perguntarDenovo();
}

export function perguntarDenovo() {
    leitor.question('Mais alguma duvida?', (resposta) => {

        resposta = resposta.toLowerCase();

        if (dados.respFinal.finalizar.some(p => resposta.includes(p))){
            console.log('Ok obrigado!')

            leitor.close();  //usar dentro do ultimo leitor para não cortar os outros leitores

        } else {
            respostas(resposta);  //retorna para a pergunta
        }
    });
}

perguntar();