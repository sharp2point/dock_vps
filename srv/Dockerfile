FROM node:21-alpine3.18

WORKDIR /server

COPY package*.json ./

RUN npm i

COPY . .

# EXPOSE 3000

# CMD ["node","run start"]