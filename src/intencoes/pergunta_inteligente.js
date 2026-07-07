import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

dotenv.config({
    path: '../.env'
});

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const produtos = JSON.parse(
    fs.readFileSync('./json/produtos.json', 'utf8')
);

const dados = JSON.parse(
    fs.readFileSync('./json/dados.json', 'utf8')
)

export async function perguntaInteligente(resposta) {
    try {
        const contexto = `
            Você é um consultor especialista em perfumes de um marketplace.

            Regras:
            - Responda em português.
            - Seja direto e fácil de entender.
            - Se a pergunta for sobre preço ou estoque da loja, use apenas os dados do sistema.
            - Se a pergunta for sobre notas olfativas, perfumes parecidos, inspiração, fixação ou avaliações, pesquise na Web.
            - Não invente preço ou estoque.
            - Se não tiver certeza, diga que não encontrou informação segura.
            - Seje educado com cada pessoa.
            - Use sempre os produtos da loja, caso o usuario quiser saber algo sobre o melhor perfume por exemplo.
            - Tente covencer o cliente a comprar o produto

            Produtos da loja:
            ${JSON.stringify(produtos, null, 2)}

            Pergunta do cliente:
            ${resposta}
            `;

        const respostaGemini = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contexto,
            config: {
                tolls: [
                    {
                        googleSearch: {}
                    }
                ]
            }
        });

        console.log(respostaGemini.text);

    } catch (erro) {
        console.error(erro.message);
    }
}