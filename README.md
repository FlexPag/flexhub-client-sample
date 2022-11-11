# FlexHub - Projeto de exemplo

## Descrição do projeto

Esse projeto serve de exemplo para integrações com o **FlexHub**. Projeto feito com a framework `React`, utilizando o `Vite` como ferramenta de build e desenvolvimento.

## Rodando o projeto

### Requisitos

- NodeJs 16 ou superior

### Instalando dependências

Utiliamos `npm` para gerenciamento das dependências do projeto. Basta rodar o comando `npm install` na pasta raiz do projeto que todas as dependências serão instaladas.

Não recomendamos utilizar outro gerenciador de dependências como `yarn`, `pnpm`, etc.

### Comandos

- `npm run start` executa o projeto em modo de desenvolvimento
- `npm run build` gera um build do projeto

---

## Variáveis ambiente

Na pasta `src` é providenciado um arquivo `.env.example`, nele estão os nomes das variáveis ambiente que são utilizadas pelo projeto para definir URLs de APIs, credenciais, entre outras configurações.

Basta duplicar o arquivo para `.env` e preencher com as credenciais providenciadas

## Definições de **REQUESTS** e **RESPONSES** de _APIs_ utilizadas

Todos os requests e responses de chamadas de _API_ utilizadas nesse projeto estão definidos utilizando a biblioteca `zod`, utilizada para definir `schemas` dos mesmos.

Além da estrutura dos requests/responses estar contida nos `schemas`, os mesmos também possuem configurações de **validação** e **transformação/tratamento** de certas propriedades.

Para integrações que não utilzem o `zod`, recomendamos analisar os requests e responses direto pela ferramenta de desenvolvimento do navegador, embora também recomendamos analisar as definições pois possuem alguns tratamentos específicos que não ficam claros apenas com o JSON enviado/recebido.
