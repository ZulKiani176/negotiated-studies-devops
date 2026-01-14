
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY src ./src

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]

