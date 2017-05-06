FROM node:boron-alpine

MAINTAINER Jon Borgonia "jon@gomagames.com"

ENV NODE_ENV production

COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
COPY db-sync.js db-sync.js index.js package.json /app/
COPY api /app/api
COPY config /app/config
COPY migrations /app/migrations
COPY models /app/models
COPY public /app/public
COPY seeders /app/seeders

WORKDIR /app

RUN npm install

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD ["node", "."]
