import fs from 'fs';

const dados = JSON.parse(
    fs.readFileSync('.//json/dados.json', 'utf8')
);

const produtos = JSON.parse (
    fs.readFileSync('.//json/produtos.json', 'utf8') 
);

