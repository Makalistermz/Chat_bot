import { identificarPerfume } from "../identificarPerfume.js";

export function verificarEstoque(resposta) {
    const perfumeEncontrado = identificarPerfume(resposta);

    if (!perfumeEncontrado) {
        console.log('Não encontrei esse perfume no nosso estoque.');
        return;
    }

    if (perfumeEncontrado.estoque > 0) {
        console.log(
            `Temos ${perfumeEncontrado.estoque} unidades do ${perfumeEncontrado.nome} no estoque.`
        );
    } else {
        console.log(
            `No momento, o perfume ${perfumeEncontrado.nome} está sem estoque.`
        );
    }
}