import fs from 'fs';

const produtos = JSON.parse(
    fs.readFileSync('./data/produtos.json', 'utf8')
);

export function identificarCategoriaPerfume(resposta) {
    for (const perfume in produtos.perfumes) {
        const produto = produtos.perfumes[perfume];

        if (resposta.includes(produto.categoria)) {
            return produto;
        }
    }
    return null;
}