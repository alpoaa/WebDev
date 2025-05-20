FROM node:23

ENV VITE_BACKEND_URL=http://localhost:3000/api

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]