FROM node:20

COPY . ./app

WORKDIR /app

COPY package.json ./

RUN yarn

RUN npm install -g tsx

CMD [ "tsx", "src/index.ts" ]
