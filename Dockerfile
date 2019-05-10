FROM node:8.11.4

ADD ./app /app

EXPOSE 3030

WORKDIR /app

RUN npm install

CMD npm start