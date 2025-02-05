ARG NODE_VERSION=23.5.0
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY .env . 
# Copying the .env file to the container
COPY . .

EXPOSE 3000
USER node

CMD ["npm","start"]
