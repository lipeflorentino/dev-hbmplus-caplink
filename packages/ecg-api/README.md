# HBM+ Backend

## Visão Geral do Projeto

Este projeto é um backend desenvolvido em Node.js e TypeScript para a aplicação HBM+ (Heart-beat monitor - Plus). A aplicação HBM+ realiza análises de padrões de sinais de batimentos cardíacos dos usuários para detectar eventuais irregularidades ou emergências em tempo real. O backend é implementado utilizando AWS Lambda e DynamoDB.

## Estrutura do Projeto

O projeto está organizado seguindo clean architecture

## Endpoints

BaseUrl: https://a88r9td2x5.execute-api.us-east-1.amazonaws.com/production

1. Create ECG Entries

- Endpoint: /ecg
- Método: POST
- Descrição: Cria uma nova entrada de ECG no banco de dados.
- Parâmetros de Requisição:
    - milivolts (number) - Leitura do ECG em milivolts.
    - deviceId (string) - Identificação do dispositivo.
    - createdAt (string) - Data e hora da criação no formato yyyy-mm-dd hh:mm:ss.
- Resposta:
    - Código 201 - Entrada de ECG criada com sucesso.
    - Código 400 - Erro na requisição.

2. List ECG Entries

- Endpoint: /ecg
- Método: GET
- Descrição: Lista todas as entradas de ECG para um determinado dispositivo dentro de um intervalo de dias especificado.
- Parâmetros de Query:
    - deviceId (string) - Identificação do dispositivo.
    - interval (number) - Intervalo de dias para buscar as entradas (maximo 30).
- Resposta:
    - Código 200 - Lista de entradas de ECG.
    - Código 400 - Erro na requisição.

3. List ECG Irregularities

- Endpoint: /ecg/rregularities
- Método: GET
- Descrição: Lista todas as irregularidades de ECG, incluindo a data de início e fim de cada irregularidade.
- Parâmetros de Query:
    - deviceId (string) - Identificação do dispositivo.
    - interval (number) - Intervalo de dias para buscar as irregularidades (maximo 30).
- Resposta:
    - Código 200 - Lista de irregularidades de ECG.
    - Código 400 - Erro na requisição.

## Configuração do Projeto

### Instalação

1. Clone o repositório:

```sh
git clone https://github.com/lipeflorentino/dev-hbmplus-caplink/tree/master/packages/ecg-api
cd ecg-api
```

2. Instale as dependências:

```sh
npm install
```

### Testes

```sh
npm test
```

### Deploy

1. Configure as variáveis de ambiente (AWS credentials, por exemplo).

O deploy é gerenciado pelo Serverless Framework. Para fazer o deploy, execute:

```sh
serverless deploy -s STAGE
```
