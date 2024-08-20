# pull official base image
FROM node:16-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
# COPY package-lock.json ./
RUN yarn install

# add app

COPY . ./

# start app
CMD ["yarn", "start"]

# # Use uma imagem base com Node.js
# FROM node:16-alpine

# # Defina o diretório de trabalho dentro do container
# WORKDIR /app

# # Instala nodemon to watch files
# RUN yarn global add nodemon

# # Copie o arquivo package.json e yarn.lock para o diretório de trabalho
# COPY package.json yarn.lock ./

# # Instale as dependências do projeto
# RUN yarn install

# # Copie todo o código do projeto para o diretório de trabalho
# COPY . .

# # Exponha a porta em que a aplicação será executada
# EXPOSE 3000

# # Comando para iniciar a aplicação
# CMD ["yarn", "start"]