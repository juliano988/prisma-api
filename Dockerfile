FROM node:lts-alpine

RUN apk add bash

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/app
