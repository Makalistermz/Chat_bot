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

export async function perguntaInteligente(resposta) {
    try {
        const contexto = `
            Você é um consultor especialista em perfumes de um marketplace.

            Regras:
            - Responda em português.
            - Seja direto e fácil de entender.
            - Se a pergunta for sobre preço, estoque ou produto da loja, use os dados abaixo.
            - Não invente preço ou estoque.
            - Se não tiver certeza, diga que não encontrou informação segura.
            - Seje educado com cada pessoa.

            Produtos da loja:
            ${JSON.stringify(produtos, null, 2)}

            Pergunta do cliente:
            ${resposta}
            `;

        const respostaGemini = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contexto
        });

        console.log(respostaGemini.text);

    } catch (erro) {
        console.error(erro.message);
    }
}