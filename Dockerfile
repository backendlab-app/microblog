FROM node:8.9.4-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# envvars
ENV HOST 0.0.0.0
EXPOSE 3000

# Install app dependencies
RUN apk update && apk upgrade && apk add git

ADD . /usr/src/app/

RUN npm install

# start command (builds and runs)
CMD sh start.sh

