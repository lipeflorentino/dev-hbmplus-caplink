# DEV-HBM-CAPLINK

## Visão Geral

Este monorepo contém os serviços necessários para o projeto HBM+ (Heart-beat monitor - Plus). O projeto está estruturado para simular o funcionamento de um dispositivo wearable que monitora batimentos cardíacos e envia os dados para um backend na nuvem. O backend analisa os dados para detectar irregularidades e alertar o usuário em tempo real.

## Arquitetura

![arquitetura](<HBM-Plus Arch.jpg>)

## Serviços

### HBM+ (Heart-beat monitor Plus)

Este serviço simula o funcionamento de um dispositivo wearable que monitora os batimentos cardíacos e envia os dados para o backend.

- Tecnologia: Node.js, Docker, AWS EC2
- Localização: packages/hbm-plus

Como Iniciar o Serviço HBM+

1. Navegue até o diretório do serviço:

```sh
cd packages/hbm-plus
```

2. Instale as dependências:

```sh
npm install
```

3. Inicie o serviço:

```sh
npm start
```

### ECG API

Este serviço é o backend que recebe os dados do HBM+, analisa os padrões de sinais de batimentos cardíacos e detecta irregularidades.

- Tecnologia: Node.js, TypeScript, AWS Lambda, DynamoDB
- Localização: packages/ecg-api

Como Iniciar o Serviço ECG API

1. Navegue até o diretório do serviço:

```sh
cd packages/ecg-api
```

2. Instale as dependências:

```sh
npm install
```

3. Inicie o serviço:

```sh
serverless invoke local -f FUNCTION_NAME -s production
```

endpoints:
  POST - https://a88r9td2x5.execute-api.us-east-1.amazonaws.com/production/ecg
  GET - https://a88r9td2x5.execute-api.us-east-1.amazonaws.com/production/ecg
  GET - https://a88r9td2x5.execute-api.us-east-1.amazonaws.com/production/ecg/irregularities

functions:
  createECGEntries
  listECGEntries
  listECGIrregularities

### Comandos Úteis

Para instalar as dependências em todos os pacotes:

```sh
lerna bootstrap
```

Para executar testes em todos os pacotes:

```sh
lerna run test
```
