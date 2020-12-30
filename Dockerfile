#for nodejs api backend
FROM alpine:latest

WORKDIR /covid-api

RUN apk update
RUN apk add nodejs-current
RUN apk add npm
RUN apk add git

RUN npm install express
RUN npm install node-fetch

COPY ./covid-api .

EXPOSE 8080