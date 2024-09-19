FROM node:18.20.3

WORKDIR /frontend_src

COPY package*.json .

RUN npm install

COPY . .

ARG VITE_BASE_URL

RUN npm run build

RUN ls | grep -P "^[^d]" | xargs -d "\n" rm -rf

CMD ls | xargs echo
