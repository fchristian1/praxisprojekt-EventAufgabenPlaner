FROM node:lts AS build-stage
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
WORKDIR /app/view
RUN npm run build:server

FROM nginx:latest AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80

