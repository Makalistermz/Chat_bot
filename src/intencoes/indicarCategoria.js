import { identificarCategoriaPerfume } from "../identificarCategoriaPerfume.js";

export function indicarCategoria(resposta) {
    const categoriaPerfume = identificarCategoriaPerfume(resposta);

    if (!categoriaPerfume) {
        console.log('Esta categoria não esta disponivel no nosso estoque!');
        return;
    }

    console.log(`Um perfume muito bom para a categoria ${categoriaPerfume.categoria} é o ${categoriaPerfume.nome} ele é perfeito para usar de ${categoriaPerfume.ocasiao}`);
}