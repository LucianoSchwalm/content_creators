FROM node:21

WORKDIR /usr/src/front

COPY package.json .

RUN npm install --quiet --no-optional --no-fund --loglevel=error

COPY . .

EXPOSE 3000

CMD ["npm", "start"]