import fs from 'fs';

const produtos = JSON.parse(
    fs.readFileSync('../json/produtos.json', 'utf8') 
);

export function identificarPerfume(resposta) {
            for (const perfume in produtos.perfumes) {
                if (resposta.includes(perfume)) {
                    return produtos.perfumes[perfume];
                }
            }
            return null;
        }

