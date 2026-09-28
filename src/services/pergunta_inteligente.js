import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config({
    path: fileURLToPath(new URL('../../.env', import.meta.url))
});

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Esta função é executada pelo SEU código, não pelo Gemini.
function consultarProduto(nome) {
    const caminho = new URL('../data/produtos.json', import.meta.url);
    const dados = JSON.parse(fs.readFileSync(caminho, 'utf8'));

    const chave = nome.trim().toLowerCase();
    const produto = dados.perfumes[chave];

    if (!produto) {
        return { encontrado: false, mensagem: 'Produto não encontrado na loja.' };
    }

    return {
        encontrado: true,
        nome: produto.nome,
        preco: produto.preco,
        estoque: produto.estoque,
        categoria: produto.categoria,
        ocasiao: produto.ocasiao
    };
}

// Isto é a DESCRIÇÃO da função que o Gemini pode solicitar.
const consultarProdutoDeclaracao = {
    name: 'consultar_produto',
    description: 'Consulta preço, estoque e características de um perfume da loja.',
    parameters: {
        type: Type.OBJECT,
        properties: {
        nome: {
            type: Type.STRING,
            description: 'Nome do perfume mencionado pelo cliente.'
        }
        },
        required: ['nome']
    }
};

export async function perguntaInteligente(pergunta) {
    try {
        const historico = [
            {
                role: 'user',
                parts: [{ text: pergunta }]
            }
        ];

        const config = {
            systemInstruction: `
                Você é um consultor de perfumes.
                Responda em português.
                Para falar de preço ou estoque da loja, consulte a função disponível.
                Nunca invente preço, estoque ou características de um produto.
            `,
            tools: [
                { functionDeclarations: [consultarProdutoDeclaracao] }
            ]
        };

        // 1. O Gemini lê a pergunta e pode solicitar uma função.
        const primeiraResposta = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: historico,
            config
        });

        const chamada = primeiraResposta.functionCalls?.[0];

        // Se não precisar consultar a loja, ele responde diretamente.
        if (!chamada) {
            console.log(`Bot: ${primeiraResposta.text}`);
            return;
        }

        if (chamada.name !== 'consultar_produto') {
            throw new Error(`Função não permitida: ${chamada.name}`);
        }

        if (typeof chamada.args?.nome !== 'string') {
            throw new Error('Nome do produto inválido.');
        }

        // 2. SEU código executa a consulta.
        const produto = consultarProduto(chamada.args.nome);

        // 3. Enviamos ao Gemini a solicitação original e o resultado real.
        historico.push(primeiraResposta.candidates[0].content);

        historico.push({
            role: 'user',
            parts: [
                {
                functionResponse: {
                    name: chamada.name,
                    response: { produto },
                    ...(chamada.id ? { id: chamada.id } : {})
                }
                }
            ]
        });

        const respostaFinal = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: historico,
            config
        });

        console.log(`Bot: ${respostaFinal.text}`);
    } catch (erro) {
        console.error('Erro ao responder:', erro.message);
    }
}