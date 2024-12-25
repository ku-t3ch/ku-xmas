FROM node:20.18.1-alpine3.20 AS base

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install -f

COPY . .

RUN npm run build

FROM node:20.18.1-alpine3.20 AS production

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/public ./public

COPY --from=base /app/.next ./.next
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/package.json ./package.json


EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push && npx prisma generate && npm run start"]
