ARG NODE_VERSION=23.5.0
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000
RUN npm install -g nodemon
USER root

CMD ["nodemon", "--legacy-watch", "app.js"]
