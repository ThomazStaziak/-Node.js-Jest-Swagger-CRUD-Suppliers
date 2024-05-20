FROM node:alpine

WORKDIR /home/stock-service/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start"]
