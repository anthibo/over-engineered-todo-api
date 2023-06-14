FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

COPY apps/todo-history-persistence apps/todo-history-persistence
COPY libs libs

RUN yarn

RUN yarn build todo-history-persistence

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./


RUN yarn

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/todo-history-persistence/main"]
