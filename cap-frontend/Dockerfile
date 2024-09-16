FROM node:18.20.3

WORKDIR /frontend_src

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]