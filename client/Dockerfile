FROM node:16

WORKDIR /adam/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4002

CMD ["npm", "run", "dev"]
