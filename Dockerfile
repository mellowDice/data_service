FROM node

RUN mkdir app
ADD . /app
WORKDIR /app

RUN npm install
RUN redis-server /usr/local/etc/redis.conf

EXPOSE 3000

ENTRYPOINT ["npm", "start"]


