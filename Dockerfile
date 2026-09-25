FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY app.js .
CMD ["node", "app.js"]
