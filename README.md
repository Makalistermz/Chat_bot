# Chat Bot para Marketplace de Perfumes

Um chatbot desenvolvido em **Node.js** para auxiliar clientes em uma loja de perfumes.
O bot identifica intenções do usuário, consulta produtos, informa preços, verifica estoque, recomenda perfumes por categoria e direciona o cliente para o suporte via WhatsApp.

> Projeto em desenvolvimento, criado para estudo, portfólio e possível uso em uma loja real.

---

## Sobre o Projeto

Este projeto simula um assistente virtual para um marketplace de perfumes.
A ideia principal é permitir que o cliente faça perguntas de forma natural, como:

```txt
qual o preço do attar al wesal?
quero um perfume doce
quantos attar al wesal tem no estoque?
quero falar com suporte
de onde vem o produto?
```

O bot analisa a mensagem, identifica a intenção do usuário e responde com base nos dados cadastrados em arquivos JSON.

---

## Funcionalidades

* Saudação automática de acordo com o horário do dia
* Identificação de intenção do usuário
* Consulta de preço de perfumes
* Consulta de estoque
* Recomendação de perfumes por categoria
* Identificação de perfumes mencionados na frase
* Respostas sobre origem do produto
* Redirecionamento para suporte via WhatsApp
* Uso de JSON como base de dados simples
* Estrutura modular com arquivos separados por responsabilidade
* Reconhecimento aproximado de palavras usando NLP com a biblioteca `natural`

---

## Tecnologias Utilizadas

* **Node.js**
* **JavaScript**
* **Readline**
* **File System**
* **JSON**
* **Natural**
* **Open**

---

## Estrutura do Projeto

```txt
Chat_bot/
├── src/
│   ├── chat-bot.js
│   ├── identificarIntencao.js
│   ├── identificarPerfume.js
│   ├── identificarCategoriaPerfume.js
│   ├── verificarPalavras.js
│   │
│   ├── intencoes/
│   │   ├── suporte.js
│   │   ├── origemProduto.js
│   │   ├── consultarPreco.js
│   │   ├── indicarCategoria.js
│   │   └── verificarEstoque.js
│   │
│   └── json/
│       ├── dados.json
│       └── produtos.json
│
├── package.json
├── package-lock.json
└── README.md
```

---

## Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Makalistermz/Chat_bot.git
```

### 2. Entre na pasta do projeto

```bash
cd Chat_bot
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o chatbot

```bash
cd src
node chat-bot.js
```

---

## Exemplos de Uso

### Consultar preço

```txt
Usuário: qual o preço do attar al wesal?
Bot: O perfume Attar Al Wesal custa APENAS! R$ 179.90
```

### Consultar estoque

```txt
Usuário: quantos attar al wesal tem no estoque?
Bot: Temos 12 unidades do Attar Al Wesal no estoque.
```

### Recomendação por categoria

```txt
Usuário: quero um perfume doce
Bot: Um perfume muito bom para a categoria doce é o Attar Al Wesal, ele é perfeito para usar de noite.
```

### Suporte

```txt
Usuário: quero falar com suporte
Bot: Abrindo Whatsapp do suporte...
```

### Origem do produto

```txt
Usuário: de onde vem meu produto?
Bot: Sua mercadoria será enviada de Santa Maria de Jetibá.
```

---

## Como o Bot Funciona

O chatbot recebe a mensagem do usuário pelo terminal e passa essa mensagem para uma função responsável por identificar a intenção.

As intenções principais são:

```txt
suporte
origem_produto
consultar_preco
categoria
estoque
```

Depois que a intenção é identificada, o bot chama a função correta.

Exemplo:

```txt
Mensagem: "quantos attar al wesal tem no estoque?"

Intenção identificada: estoque

Função chamada: verificarEstoque()
```

---

## Base de Produtos

Os produtos ficam armazenados no arquivo:

```txt
src/json/produtos.json
```

Exemplo de produto:

```json
{
    "attar al wesal": {
        "nome": "Attar Al Wesal",
        "preco": 179.90,
        "categoria": "doce",
        "genero": "masculino",
        "ocasiao": "noite",
        "estoque": 12
    }
}
```

---

## Base de Intenções

As palavras-chave ficam armazenadas no arquivo:

```txt
src/json/dados.json
```

Exemplo:

```json
{
    "intencoes": {
        "estoque": [
            "estoque",
            "disponível",
            "quantos",
            "quantas",
            "unidades",
            "tem",
            "restam"
        ]
    }
}
```

---

## Aprendizados do Projeto

Durante o desenvolvimento deste projeto foram praticados conceitos importantes, como:

* Manipulação de arquivos JSON
* Modularização em JavaScript
* Importação e exportação de funções
* Uso de bibliotecas externas
* Estruturação de projeto Node.js
* Controle de fluxo com `switch`
* Identificação de intenções
* Tratamento de respostas do usuário
* Integração com WhatsApp
* Uso de NLP básico com `natural`

---

## Melhorias Futuras

* Melhorar o sistema de pontuação para identificar intenções
* Adicionar recomendação por gênero
* Adicionar recomendação por ocasião
* Criar recomendação mais avançada por perfil do cliente
* Adicionar histórico de conversas
* Criar painel administrativo para cadastrar produtos
* Migrar os dados de JSON para banco de dados
* Integrar o bot com WhatsApp real
* Criar uma versão web do chatbot
* Melhorar tratamento de erros
* Criar testes automatizados

---

## Status do Projeto

Em desenvolvimento.

Atualmente o bot já consegue:

* Identificar algumas intenções
* Consultar preço
* Consultar estoque
* Recomendar perfumes por categoria
* Abrir suporte no WhatsApp
* Responder perguntas básicas sobre origem do produto

---

## Autor

Desenvolvido por **Makalister Mutz Zager**.

GitHub: [Makalistermz](https://github.com/Makalistermz)

---

## Licença

Este projeto é livre para estudo e evolução.
