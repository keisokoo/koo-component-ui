# Base image
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the project
RUN npm run build

# Serve the built files using a lightweight HTTP server
FROM caddy:latest
COPY --from=build /app/dist /var/www/html
