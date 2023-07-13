# Dockerfile

# 빌드 스테이지
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN npm install -g serve

CMD ["serve", "-s", "dist"]
