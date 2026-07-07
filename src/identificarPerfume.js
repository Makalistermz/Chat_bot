import fs from 'fs';
import { verificarPalavra } from './utils/verificarPalavras.js';

const produtos = JSON.parse(
    fs.readFileSync('./data/produtos.json', 'utf8') 
);

export function identificarPerfume(resposta) {
            for (const perfume in produtos.perfumes) {
                if (verificarPalavra(resposta, [perfume])) {
                    return produtos.perfumes[perfume];
                }
            }
            return null;
        }

