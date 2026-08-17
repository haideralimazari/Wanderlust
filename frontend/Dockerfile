# ------------------- Stage 1: Build Stage ------------------------------
FROM node:21 AS frontend-builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN if [ -f .env.docker ]; then cp .env.docker .env.local; else cp .env.sample .env.local; fi

RUN npm run build

# ------------------- Stage 2: Production Stage ------------------------------
FROM node:21-slim

WORKDIR /app

COPY --from=frontend-builder /app/package*.json ./
COPY --from=frontend-builder /app/node_modules ./node_modules
COPY --from=frontend-builder /app/dist ./dist

EXPOSE 5173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
