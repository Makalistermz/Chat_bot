# 🤖 Chat Bot - Marketplace Assistant

Um chatbot inteligente desenvolvido em **Node.js** para um marketplace, capaz de responder dúvidas, informar preços de produtos e direcionar clientes para o suporte.

## 📋 Sobre o Projeto

Este chatbot foi desenvolvido para atuar como um assistente virtual em um marketplace. Ele utiliza processamento de linguagem natural (NLP) para identificar a intenção do usuário e fornecer respostas apropriadas, além de realizar consultoria de produtos e suporte ao cliente.

### ✨ Principais Recursos

- ✅ **Identificação de Intenção**: Analisa o texto do usuário para determinar se ele busca suporte, informações sobre produtos ou consultoria de preços
- ✅ **Saudações Dinâmicas**: Cumprimenta o usuário de forma diferente dependendo da hora do dia (manhã, tarde, noite)
- ✅ **Análise de Similaridade**: Usa o algoritmo Jaro-Winkler para reconhecer palavras-chave mesmo com possíveis erros de digitação
- ✅ **Identificação de Perfumes**: Reconhece quando o usuário menciona um perfume específico e cita o seu preço
- ✅ **Aprendizado Contínuo**: Armazena novas pergunta em JSON para melhorar futuras interações
- ✅ **Integração com WhatsApp**: Redireciona usuários para o suporte via WhatsApp

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Natural** (v8.1.1) - Biblioteca NLP para análise de similaridade de palavras
- **Open** (v11.0.0) - Abre URLs diretamente (para WhatsApp)
- **Readline** - Interface de linha de comando
- **JSON** - Armazenamento de dados

## 📁 Estrutura do Projeto

```
Chat_bot/
├── src/
│   ├── chat-bot.js                 # Arquivo principal do chatbot
│   ├── identificarIntencao.js      # Identifica a intenção do usuário
│   ├── identificarPerfume.js       # Identifica perfumes mencionados
│   ├── verificarPalavras.js        # Verifica similaridade de palavras
│   ├── intencoes/
│   │   ├── suporte.js              # Intenção: suporte
│   │   ├── origemProduto.js        # Intenção: origem do produto
│   │   └── consultarPreco.js       # Intenção: consultar preço
│   └── json/
│       ├── dados.json              # Dados de saudações e palavras-chave
│       └── produtos.json           # Dados dos produtos (perfumes)
├── package.json                    # Dependências do projeto
├── package-lock.json               # Lock do npm
└── LICENSE                         # Licença MIT
```

## 🚀 Como Usar

### Requisitos
- Node.js 14+ instalado
- npm (geralmente vem com Node.js)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Makalistermz/Chat_bot.git
cd Chat_bot
```

2. Instale as dependências:
```bash
npm install
```

### Executar o Chatbot

```bash
node src/chat-bot.js
```

O chatbot iniciará e aguardará sua entrada no terminal

### Intenções Suportadas

| Intenção | Descrição | Ação |
|----------|-----------|------|
| **suporte** | Usuário solicita suporte | Redireciona para WhatsApp do suporte |
| **origem_produto** | Usuário pergunta sobre a origem do produto | Fornece informações do arquivo de dados |
| **consultar_preco** | Usuário quer saber o preço | Consulta o banco de dados de produtos |

### Aprendizado Dinâmico

Quando o chatbot não compreende uma pergunta:
1. Solicita ao usuário que categorize a pergunta
2. Armazena a pergunta na categoria correspondente
3. Usa essa informação em futuras interações

## 🔧 Detalhes Técnicos

### Algoritmo de Similaridade

O projeto utiliza o **Jaro-Winkler Distance** para reconhecer palavras-chave, permitindo:
- Tolerância a erros de digitação
- Reconhecimento fuzzy matching
- Threshold configurável (atualmente 0.85)

```javascript
const similaridade = natural.JaroWinklerDistance(
    palavraDigitada,
    palavraChave
);
return resposta.includes(palavraChave) || similaridade >= 0.85;
```

### Estrutura de Dados

**dados.json** - Contém:
- Saudações (manhã, tarde, noite)
- Palavras-chave por categoria
- Respostas finais

**produtos.json** - Contém:
- Informações dos perfumes (nome, preço, origem, características)

## 📝 Exemplo de Uso

```
Opa! Como vai? 👋

> qual o preço do perfume X-Men?
Esse perfume custa R$ 89,90

Mais alguma duvida?

> sim, quero falar com o suporte
Ok! Abrindo WhatsApp...

Mais alguma duvida?

> não
Ok obrigado!
```

## 🎯 Futuras Melhorias

Conforme comentado no código:
- 🔜 Recomendar perfumes por categoria (ex: "Quero um perfume doce")
- 🔜 Melhorar análise de sentimentos
- 🔜 Adicionar mais intenções de negócio
- 🔜 Persistência melhorada de dados

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

[Makalistermz](https://github.com/Makalistermz)

## 🤝 Contribuições

Contribuições são bem-vindas! Fique à vontade para abrir issues e pull requests.

---

**Desenvolvido com ❤️ para melhorar a experiência do cliente no marketplace**
