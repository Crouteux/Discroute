FROM node:14-alpine

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build

ENTRYPOINT [ "npm", "start" ]
