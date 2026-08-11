# Stage 1
FROM node:21 AS backend-builder

# setup the working dir
WORKDIR /app

# code
COPY . .

# packages install
RUN npm i

# Write env from docker file if present, otherwise fallback to sample
RUN if [ -f .env.docker ]; then cp .env.docker .env; else cp .env.sample .env; fi

# Stage 2
FROM node:21-slim

# setup the working dir
WORKDIR /app

# copy the above stage as compressed
COPY --from=backend-builder /app .

# Port
EXPOSE 5000

# App
CMD ["npm", "start"]
