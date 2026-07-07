# Chat Bot para Marketplace de Perfumes

Chatbot desenvolvido em **Node.js** para auxiliar clientes de uma loja de perfumes.

O projeto combina lógica própria, identificação de intenções, reconhecimento aproximado de palavras, contexto de conversa e integração com o **Google Gemini** para perguntas mais abertas.

> Projeto em desenvolvimento, criado para estudo, portfólio e possível uso em uma loja real.

---

## Sobre o projeto

A ideia é permitir que o cliente converse de forma natural com o chatbot e faça perguntas como:

```txt
qual o preço do attar al wesal?
quero um perfume doce
quantos attar al wesal tem no estoque?
quero falar com suporte
de onde vem o produto?
qual perfume vale mais a pena?
ele tem boa fixação?
```

O chatbot tenta resolver primeiro as solicitações conhecidas usando a própria lógica do sistema.

Perguntas mais abertas ou que não se encaixam nas intenções cadastradas podem ser encaminhadas para o Gemini.

O Gemini funciona como apoio e não controla sozinho todo o fluxo do chatbot.

---

## Funcionalidades atuais

* Saudação automática de acordo com o horário do dia
* Identificação de intenção do usuário
* Sistema de pontuação para escolher a intenção mais provável
* Consulta de preço de perfumes
* Consulta de estoque
* Recomendação de perfumes por categoria
* Identificação de perfumes mencionados na frase
* Reconhecimento aproximado de palavras com `JaroWinklerDistance`
* Respostas sobre a origem dos produtos
* Redirecionamento para suporte via WhatsApp
* Contexto da conversa com memória do último perfume mencionado
* Resolução de referências como `ele`, `ela`, `esse` e `essa`
* Integração com o Google Gemini para perguntas mais abertas
* Uso de arquivos JSON como base de dados simples
* Código separado em intenções, serviços, dados e utilitários

---

## Tecnologias utilizadas

* **Node.js**
* **JavaScript com ES Modules**
* **Readline**
* **File System**
* **JSON**
* **Natural**
* **Google GenAI**
* **Dotenv**
* **Open**

---

## Estrutura atual do projeto

```txt
Chat_bot/
├── src/
│   ├── chat-bot.js
│   ├── historico.js
│   ├── identificarIntencao.js
│   ├── identificarPerfume.js
│   ├── identificarCategoriaPerfume.js
│   │
│   ├── data/
│   │   ├── dados.json
│   │   └── produtos.json
│   │
│   ├── intencoes/
│   │   ├── consultarPreco.js
│   │   ├── indicarCategoria.js
│   │   ├── origemProduto.js
│   │   ├── suporte.js
│   │   └── verificarEstoque.js
│   │
│   ├── services/
│   │   └── pergunta_inteligente.js
│   │
│   └── utils/
│       └── verificarPalavras.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── LICENSE
```

---

## Organização do projeto

### `data/`

Armazena os dados usados pelo chatbot.

```txt
data/
├── dados.json
└── produtos.json
```

O arquivo `dados.json` contém:

* intenções
* palavras-chave
* saudações
* respostas do sistema

O arquivo `produtos.json` contém informações dos perfumes, como:

* nome
* preço
* categoria
* gênero
* ocasião
* estoque

---

### `intencoes/`

Contém as ações executadas quando o chatbot identifica uma intenção conhecida.

```txt
intencoes/
├── consultarPreco.js
├── indicarCategoria.js
├── origemProduto.js
├── suporte.js
└── verificarEstoque.js
```

Cada arquivo possui uma responsabilidade específica.

Exemplos:

```txt
consultar_preco → consultarPreco()
estoque → verificarEstoque()
categoria → indicarCategoria()
origem_produto → origemProduto()
suporte → suporte()
```

---

### `services/`

Contém integrações externas usadas pelo chatbot.

Atualmente:

```txt
services/
└── pergunta_inteligente.js
```

O arquivo `pergunta_inteligente.js` é responsável pela integração com o Google Gemini.

---

### `utils/`

Contém funções auxiliares reutilizáveis.

Atualmente:

```txt
utils/
└── verificarPalavras.js
```

O arquivo `verificarPalavras.js` usa a biblioteca `natural` para comparar palavras e tolerar pequenas diferenças de digitação.

---

## Como o chatbot funciona

O fluxo atual é híbrido:

```txt
Mensagem do usuário
        ↓
Atualiza o contexto da conversa
        ↓
Verifica se é uma pergunta aberta
        ↓
Sim → Gemini
        ↓
Não → Identificação de intenção
        ↓
Executa a função correspondente
        ↓
Se nenhuma intenção for encontrada
        ↓
Gemini como apoio
```

As intenções principais são:

```txt
suporte
origem_produto
consultar_preco
categoria
estoque
```

Exemplo:

```txt
Mensagem:
"quantos attar al wesal tem no estoque?"

Intenção identificada:
estoque

Função executada:
verificarEstoque()
```

Perguntas mais abertas podem ser tratadas pelo Gemini.

Exemplos:

```txt
qual é o melhor perfume?
quais são as notas olfativas?
ele tem boa fixação?
qual vale mais a pena?
qual é parecido com esse?
```

---

## Sistema de intenções

As intenções são identificadas por meio de palavras e frases cadastradas em:

```txt
src/data/dados.json
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
            "restam",
            "sobrou"
        ]
    }
}
```

O chatbot calcula uma pontuação para cada intenção.

Palavras isoladas recebem uma pontuação menor.

Frases completas recebem uma pontuação maior.

Exemplo:

```txt
"preço" → peso menor

"quanto custa" → peso maior
```

A intenção com a maior pontuação é selecionada.

---

## Reconhecimento aproximado de palavras

O chatbot usa a biblioteca `natural` e o algoritmo `JaroWinklerDistance`.

Isso permite reconhecer pequenas diferenças de digitação.

Exemplo:

```txt
suporte
supoorte
```

Mesmo com o erro de digitação, o sistema pode considerar as palavras semelhantes.

A lógica fica em:

```txt
src/utils/verificarPalavras.js
```

---

## Contexto da conversa

O arquivo:

```txt
src/historico.js
```

mantém informações sobre a conversa atual.

O contexto guarda:

```txt
último perfume
último gênero
último preço
última categoria
última pergunta
```

Exemplo de conversa:

```txt
Usuário:
qual o preço do attar al wesal?

Usuário:
ele tem boa fixação?
```

O chatbot pode associar:

```txt
ele
```

ao último perfume mencionado:

```txt
Attar Al Wesal
```

Algumas palavras usadas para recuperar contexto são:

```txt
ele
ela
esse
essa
desse
dessa
```

> Atualmente o contexto existe apenas durante a execução do programa e não é salvo permanentemente.

---

## Integração com o Gemini

O projeto usa:

```txt
@google/genai
```

A integração fica em:

```txt
src/services/pergunta_inteligente.js
```

O Gemini é usado principalmente para perguntas mais abertas sobre perfumes.

Exemplos:

```txt
qual é o melhor perfume?
esse perfume vale a pena?
ele tem boa fixação?
qual é parecido com esse?
quais são as notas olfativas?
```

Os produtos cadastrados na loja são enviados como contexto para que o Gemini possa considerar os itens disponíveis no sistema.

O Gemini funciona como apoio.

As intenções conhecidas continuam sendo tratadas pela lógica própria do chatbot.

```txt
Preço → sistema próprio
Estoque → sistema próprio
Categoria → sistema próprio
Origem → sistema próprio
Suporte → sistema próprio
Perguntas abertas → Gemini
```

---

## Base de produtos

Os produtos ficam armazenados em:

```txt
src/data/produtos.json
```

Exemplo:

```json
{
    "perfumes": {
        "attar al wesal": {
            "nome": "Attar Al Wesal",
            "preco": 179.90,
            "categoria": "doce",
            "genero": "masculino",
            "ocasiao": "noite",
            "estoque": 12
        }
    }
}
```

Atualmente, os produtos são usados para:

* consultar preço
* verificar estoque
* identificar perfumes
* recomendar por categoria
* fornecer contexto para perguntas mais abertas

---

## Como executar o projeto

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

### 4. Configure a chave do Gemini

Crie um arquivo `.env` na raiz do projeto:

```env
GEMINI_API_KEY=sua_chave_aqui
```

O arquivo `.env` não deve ser enviado para o GitHub.

Ele já está incluído no `.gitignore`.

### 5. Entre na pasta `src`

```bash
cd src
```

### 6. Execute o chatbot

```bash
node chat-bot.js
```

---

## Exemplos de uso

### Consultar preço

```txt
Usuário:
qual o preço do attar al wesal?

Bot:
O perfume Attar Al Wesal custa APENAS! R$ 179.90
```

---

### Consultar estoque

```txt
Usuário:
quantos attar al wesal tem no estoque?

Bot:
Temos 12 unidades do Attar Al Wesal no estoque.
```

---

### Recomendação por categoria

```txt
Usuário:
quero um perfume doce

Bot:
Um perfume muito bom para a categoria doce é o Attar Al Wesal, ele é perfeito para usar de noite.
```

---

### Suporte

```txt
Usuário:
quero falar com suporte

Bot:
Abrindo Whatsapp do suporte...
```

---

### Origem do produto

```txt
Usuário:
de onde vem meu produto?

Bot:
Sua mercadoria será enviada de Santa Maria de Jetibá.
```

---

### Pergunta aberta

```txt
Usuário:
qual perfume vale mais a pena?

Bot:
A pergunta é encaminhada para a integração inteligente.
```

---

### Uso de contexto

```txt
Usuário:
qual o preço do attar al wesal?

Usuário:
ele tem boa fixação?
```

O chatbot utiliza o último perfume mencionado para entender que:

```txt
ele = Attar Al Wesal
```

---

## Aprendizados do projeto

Durante o desenvolvimento deste projeto foram praticados conceitos como:

* Manipulação de arquivos JSON
* Modularização em JavaScript
* Importação e exportação com ES Modules
* Uso de bibliotecas externas
* Estruturação de projeto Node.js
* Controle de fluxo com `switch`
* Identificação de intenções
* Sistema de pontuação
* Tratamento de respostas do usuário
* Integração com WhatsApp
* NLP básico com `natural`
* Similaridade de textos com Jaro-Winkler
* Integração com API de inteligência artificial
* Variáveis de ambiente com `.env`
* Contexto entre mensagens consecutivas
* Separação do projeto por responsabilidades

---

## Próximos passos

O foco atual do projeto é preparar o chatbot para uma interface web.

Principais melhorias planejadas:

* Separar a lógica principal da interface de terminal
* Criar uma função central para processar mensagens
* Fazer as funções retornarem respostas em vez de dependerem diretamente de `console.log`
* Criar o layout web do chatbot
* Conectar o frontend ao chatbot
* Melhorar o tratamento de erros
* Criar testes automatizados
* Salvar o contexto de forma persistente no futuro
* Migrar os dados de JSON para banco de dados quando necessário

---

## Status do projeto

**Em desenvolvimento.**

Atualmente o chatbot já consegue:

* identificar intenções conhecidas
* consultar preço
* consultar estoque
* recomendar perfumes por categoria
* abrir suporte no WhatsApp
* responder sobre a origem dos produtos
* reconhecer pequenas diferenças de digitação
* manter contexto básico durante a conversa
* usar o Gemini como apoio para perguntas mais abertas

A próxima etapa do projeto é a criação da versão web do chatbot.

---

## Autor

Desenvolvido por **Makalister Mutz Zager**.

GitHub: [Makalistermz](https://github.com/Makalistermz)

---

## Licença

Este projeto está sob a licença MIT.

Isso permite uso, cópia, modificação e distribuição do código, desde que o aviso de copyright e a licença sejam mantidos.

Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
