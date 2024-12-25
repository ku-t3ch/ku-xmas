FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++
RUN apk add --no-cache openssl

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npx prisma generate

CMD ["sh", "-c", "/usr/local/bin/wait-for-it.sh db:5432 -- npx prisma db push && npm run start"]