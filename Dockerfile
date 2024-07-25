FROM node:20

COPY . ./app

WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn/

RUN rm -rf /node_modules
RUN rm -rf /dist

RUN npm install -g corepack@latest && corepack enable
RUN yarn install --mode=update-lockfile
RUN yarn install

RUN yarn build

CMD [ "yarn", "start" ]
