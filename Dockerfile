FROM node:22-alpine

WORKDIR /app

RUN npm install -g @angular/cli@22

ENV NG_CLI_ANALYTICS=ci

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "500"]
