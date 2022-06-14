FROM node:16

WORKDIR /usr/src/app/my-app

COPY package*.json ./

RUN npm install

EXPOSE 8081

CMD ["npm", "start"]