FROM node:latest
ARG user
ARG uid
#Install Depedencies
RUN apt-get update && apt-get install -y git curl libpng-dev libonig-dev libxml2-dev zip unzip
# Clear Cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

COPY package.json /var/www/html/package.json

WORKDIR /var/www/html

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]