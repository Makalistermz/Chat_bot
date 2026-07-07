import { identificarPerfume } from '..//identificarPerfume.js';

export function consultarPreco(resposta) {
    const perfumeEncontrado = identificarPerfume(resposta);

    if (!perfumeEncontrado) {
    console.log('Não encontrei esse perfume...');
    return;
    }

    console.log(`O perfume ${perfumeEncontrado.nome} custa APENAS! R$ ${perfumeEncontrado.preco.toFixed(2)}`) //toFixed(2) serve para formatar números decimais
    
}