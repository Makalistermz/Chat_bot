/*
RODAR TESTE DO GEMINI PARA VERIFICAR SE É A REDE QUE ESTA BLOQUEANDO
*/

import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config({ path: '../.env' });

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

try {
    const resposta = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: 'Responda apenas: teste funcionando'
    });

    console.log(resposta.text);
} catch (erro) {
    console.error(erro);
}