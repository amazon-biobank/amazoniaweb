FROM node:14
WORKDIR /app
COPY package*.json ./
ENV PORT=${PORT}
RUN npm install
COPY . .
CMD ["npm", "start"]

