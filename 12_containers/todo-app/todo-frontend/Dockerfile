FROM node:20 AS base-node

WORKDIR /usr/src/app


FROM base-node AS test

ENV VITE_BACKEND_URL=http://localhost:3000

COPY . .

RUN npm ci --include=dev

CMD ["npm", "run", "test"]


FROM base-node AS build-node

ENV VITE_BACKEND_URL=http://localhost:3000

COPY . .

RUN npm ci

RUN npm run build


FROM nginx:1.28-alpine

COPY --from=build-node /usr/src/app/dist /usr/share/nginx/html



