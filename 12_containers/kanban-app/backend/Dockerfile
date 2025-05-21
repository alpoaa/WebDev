FROM node:23

WORKDIR /usr/src/app

COPY --chown=node:node . .

ENV NODE_ENV=production

RUN npm ci --omit=dev

USER node

CMD ["npm", "start"]