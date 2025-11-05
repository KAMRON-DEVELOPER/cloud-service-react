FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# copy custom nginx.conf if you need rewrites for SPA routing
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
