FROM node:18.18.0-buster

WORKDIR /app

COPY . .

RUN npm install

CMD ["/bin/bash", "-c", "npx nx serve monitoring-api --host=0.0.0.0;npx nx serve monitoring-ui --host=0.0.0.0"]