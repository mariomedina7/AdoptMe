FROM node:20.12.2
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p /app/logs
EXPOSE 8085
CMD [ "node", "src/app.js" ]