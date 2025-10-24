FROM node:20.12.2 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .


CMD ["npm", "run", "start"]