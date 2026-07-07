import fs from 'fs';
import { identificarIntencao, identificarIntencao } from './identificarIntencao';
import { suporte } from './intencoes/suporte';

const dados = JSON.parse(
    fs.readFileSync('./json/dados.json', 'utf8')
);

export function ultimasResposta(resposta) {

    const contexto = {
        ultimoPerfume: null,
        ultimoGenero: null, 
        ultimoPreco: null, 
        ultimaCategoria: null, 
        ultimaPergunta: null
    }

    const intencao = identificarIntencao(resposta);

    switch(intencao) {
        case 'consultar_preco': 
            contexto.ultimoPreco = resposta;
            break;
        case 'categoria':
            contexto.ultimaCategorial = resposta;
            break;
    }
}