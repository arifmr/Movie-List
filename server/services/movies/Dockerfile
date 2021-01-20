FROM node:12.19.0

WORKDIR /usr/hacktiv8/entertainme/server/services/movies

COPY . .

ENV PORT=4001

RUN npm install -g nodemon

RUN npm install && npm cache clean --force

EXPOSE 4001

CMD ["nodemon", "app.js"]