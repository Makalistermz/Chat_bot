import fs from 'fs';
import { identificarIntencao } from './identificarIntencao.js';
import { identificarPerfume } from './identificarPerfume.js';

const dados = JSON.parse(
    fs.readFileSync('./json/dados.json', 'utf8')
);

const contexto = {
    ultimoPerfume: null,
    ultimoGenero: null, 
    ultimoPreco: null, 
    ultimaCategoria: null, 
    ultimaPergunta: null
}

export function ultimasResposta(resposta) {
    resposta = resposta.toLowerCase();

    const perfumeEncontrado = identificarPerfume(resposta)

    const intencao = identificarIntencao(resposta);

    if (perfumeEncontrado) {
        contexto.ultimoPerfume = perfumeEncontrado.nome;
        contexto.ultimoGenero = perfumeEncontrado.genero;
        contexto.ultimoPreco = perfumeEncontrado.preco.toFixed(2);
        contexto.ultimaCategoria = perfumeEncontrado.categoria;
    }

    contexto.ultimaPergunta = resposta;
    
    return {
        intencao,
        perfumeEncontrado,
        contexto
    };

}