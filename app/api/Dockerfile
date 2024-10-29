FROM node:lts
WORKDIR /app
COPY ./package.json .
WORKDIR /app/api
RUN npm install
WORKDIR /app
COPY . .
WORKDIR /app/api
CMD ["npm", "run", "start"]
#CMD ["tail", "-f", "/dev/null"]
