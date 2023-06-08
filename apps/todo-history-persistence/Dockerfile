FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

COPY apps/todo-history-persistence apps/todo-history-persistence

RUN yarn

RUN yarn build payments

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./


RUN yarn

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/todo-history-persistence/main"]
