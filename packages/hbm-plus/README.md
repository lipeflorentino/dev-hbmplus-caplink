# ECG Project

Este é um projeto Node.js básico usando Express que possui dois endpoints: um para receber um sinal e outro para enviar um sinal ECG usando comandos de terminal.

## Requisitos

- Node.js v14 ou superior
- npm ou yarn

## Instalação

1. Clone o repositório:

```sh
git clone https://github.com/lipeflorentino/dev-hbmplus-caplink/tree/master/packages/hbm-plus
cd ecg-project
```

2. Instale as dependências:

```sh
npm install
# ou
yarn install
```

3. Configuração

Certifique-se de que você tem o endpoint externo configurado no arquivo index.js para onde o sinal ECG será enviado.


## Execução

```sh
npm start
```

O servidor será executado em http://localhost:3000

## Endpoints

### POST /receive-signal

Recebe um sinal.

Requisição:

```json
{
  "signal": "string"
}
```

Resposta:

```sh
200 OK
Signal received
```

## Comando do Terminal

Você pode enviar um sinal ECG usando comandos de terminal. Certifique-se de que o servidor está em execução e digite o comando no terminal onde o servidor está rodando.

```sh
ecg <deviceId> <milivolts> <interval>
```

Exemplo:

```sh
ecg device-123 1.5 30
```
## Estrutura do Projeto

```plaintext
hbm-plus/
├── node_modules/
├── index.js
├── package.json
└── README.md
```

## Construir e Executar o Container

*É necessário ter docker instalado

1. Construir a imagem Docker:

No diretório do projeto, execute:

```sh
docker build -t hbm-plus .
```

2. Executar o container:

```sh
docker run -p 8080:3000 hbm-plus
```

Isso irá iniciar o container e mapear a porta 8080 do host para a porta 8080 do container, permitindo que você acesse a aplicação em http://localhost:8080.

3. Utilizando o Terminal Interativo

Para utilizar os comandos de terminal interativos (ecg), você pode iniciar um container interativo:

```sh
docker run -it -p 8080:3000 hbm-plus
```

Isso permitirá que você execute comandos no terminal do container, enquanto a aplicação Node.js está rodando.

4. Listar os containers em execução:

```sh
docker ps
```

Isso exibirá uma lista de containers em execução, semelhante a esta:

5. Parar o container:

Use o comando docker stop seguido pelo ID ou nome do container

```sh
docker stop container_id
```

6. Remover o container após parar

```sh
docker rm container_id
```
