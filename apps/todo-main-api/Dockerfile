FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

COPY apps/todo-main-api apps/todo-main-api
COPY libs libs


RUN yarn install 

RUN yarn run build todo-main-api

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/todo-main-api/main"]
