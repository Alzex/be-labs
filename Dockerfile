FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

RUN npm run migration:run

ENTRYPOINT ["npm", "run", "start:prod"]
