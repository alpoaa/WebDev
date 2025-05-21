FROM node:23 AS build-node

WORKDIR /usr/src/app

ENV VITE_BACKEND_URL="http://localhost:8080/api"

COPY . .

RUN npm ci

RUN npm run build


FROM nginx:1.20.1

COPY --from=build-node /usr/src/app/dist /usr/share/nginx/html
