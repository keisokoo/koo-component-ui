# Dockerfile

# 빌드 환경
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# 프로덕션 환경
FROM caddy:2-alpine

COPY --from=build /app/dist /usr/share/caddy
