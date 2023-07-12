# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build

# Production stage
FROM nginx:stable-alpine AS production
FROM caddy:latest
COPY --from=build /app/dist /var/www/html
