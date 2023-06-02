FROM node:18.16.0
RUN apt-get update -qq && apt-get install -y nodejs vim
WORKDIR /usr/src/app
CMD yarn install && yarn start