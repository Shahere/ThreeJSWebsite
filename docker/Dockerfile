# Stage 1: Build the Vite app
FROM node:20 AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install
RUN npm install --save-dev vite

# Copy all files (including index.html in root)
COPY . .

# Build the Vite project
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build output to Nginxs HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy a custom Nginx config file
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
