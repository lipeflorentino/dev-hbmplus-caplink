# Use a imagem base oficial do Node.js
FROM node:20

# Defina o diretório de trabalho no container
WORKDIR /usr/src

# Copie o package.json e o package-lock.json (se disponível)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código do aplicativo para o diretório de trabalho
COPY . .

# Exponha a porta em que a aplicação vai rodar
EXPOSE 8080

# Defina o comando para iniciar a aplicação
CMD [ "node", "index.js" ]
