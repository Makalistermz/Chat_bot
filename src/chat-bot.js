/*
        Recomendar perfumes proxima atualização por categoria, ex: "Quero um perfume doce"
*/
import { createInterface } from 'readline';
import fs from 'fs';
import open from 'open';  //Biblioteca responsavel por abrir o whatsapp
import { identificarPerfume } from './identificarPerfume.js';
import { verificarPalavra } from './verificarPalavras.js';
import { identificarIntencao } from './identificarIntencao.js';
import { suporte } from './/intencoes/suporte.js';
import { origemProduto } from './/intencoes/origemProduto.js';
import { consultarPreco } from './/intencoes/consultarPreco.js';

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
    
        resposta = resposta.toLowerCase();  // reconhece maiúscula como minusculas

        const intencao = identificarIntencao(resposta);

        switch (intencao) {
            case 'suporte':
                suporte(resposta);
                perguntarDenovo();
                break
            case 'origem_produto':
                origemProduto(resposta);
                perguntarDenovo();
                break
            case 'consultar_preco': 
                consultarPreco(resposta);
                perguntarDenovo();
                break
            default:
                console.log('Não entendi oque você quis dizer')
            
                leitor.question(
                    'Essa pergunta é sobre:\n1. Dia\n2. Origem do Produto\n3. Suporte\n4. Valor do produto\nEscolha uma opção: ', 
                    (categoria) => {
                        if (categoria === '1') {
                            dados.palavrasChave.dia.push(resposta)
                        } else if (categoria === '2') {
                            dados.palavrasChave.origemProduto.push(resposta)
                        } else if (categoria === '3') {
                            dados.palavrasChave.suporte.push(resposta)
                        } else if (categoria === '4') {
                            dados.palavrasChave.valor.push(resposta)
                        } else {
                            console.log('Opção inválida.');
                            perguntar();
                            return;
                        }
                        
                        fs.writeFileSync(  // salva a pergunta do user no JON
                            '../json/dados.json',
                            JSON.stringify(dados, null, 4)
                        );

                        perguntarDenovo()

                    }
                );
                return;

                break
        }
    })
}

export function perguntarDenovo() {
    leitor.question('Mais alguma duvida?', (resposta) => {

        resposta = resposta.toLowerCase();

        if (dados.respFinal.finalizar.some(p => resposta.includes(p))){
            console.log('Ok obrigado!')

            leitor.close();  //usar dentro do ultimo leitor para não cortar os outros leitores

        } else {
            perguntar();  //retorna para a pergunta
        }
    });
}

perguntar();