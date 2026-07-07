import natural from 'natural';

export function verificarPalavra(resposta, listaPalavras) {
    const palavrasDigitadas = resposta.split(' '); //Separar a frase em palavras

    return listaPalavras.some(palavraChave => {
        return palavrasDigitadas.some(palavraDigitada => {
            const similaridade = natural.JaroWinklerDistance(  //Calcular a similaridade
                palavraDigitada,
                palavraChave
            );
            return resposta.includes(palavraChave) || similaridade >= 0.85;
        });
    });
}