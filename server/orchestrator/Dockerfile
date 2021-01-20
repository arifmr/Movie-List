FROM node:12.19.0

WORKDIR /usr/hacktiv8/entertainme/server/orchestrator

COPY . .

ENV PORT=4000

RUN npm install -g nodemon

RUN npm install && npm cache clean --force

EXPOSE 4000

CMD ["nodemon", "app.js"]