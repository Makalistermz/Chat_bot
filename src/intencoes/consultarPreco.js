import { identificarPerfume } from '..//identificarPerfume.js';
import { perguntarDenovo } from '../chat-bot.js';

export function consultarPreco(resposta) {
    const perfumeEncontrado = identificarPerfume(resposta);

    console.log(
        `O perfume ${perfumeEncontrado.nome} custa APENAS! R$ ${perfumeEncontrado.preco.toFixed(2)}`
    ) //toFixed(2) serve para formatar números decimais
    
    perguntarDenovo()
}