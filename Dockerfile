FROM node:14

ARG HTTP_PROXY
ARG HTTPS_PROXY

WORKDIR /code
ADD ./package.json /code
ADD ./package-lock.json /code

RUN npm install

CMD [ "npm", "start" ]