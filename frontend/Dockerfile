ARG NODE_VERSION=23.5.0
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

VOLUME .:/app
EXPOSE 5173

CMD ["npm","run","dev"]