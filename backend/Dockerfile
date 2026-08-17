# Stage 1
FROM node:21 AS backend-builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN if [ -f .env.docker ]; then cp .env.docker .env; else cp .env.sample .env; fi

# Stage 2
FROM node:21-slim

WORKDIR /app

COPY --from=backend-builder /app .

EXPOSE 5000

CMD ["node", "server.js"]
