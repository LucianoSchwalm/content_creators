FROM node:21

WORKDIR /usr/src/api

COPY . .

RUN npm install --quiet --no-optional --no-fund --loglevel=error

RUN npm run build

EXPOSE 3500

CMD ["npm", "start"]

