FROM node:14

ARG HTTP_PROXY
ARG HTTPS_PROXY

USER node
WORKDIR /code
ADD ./package.json /code
ADD ./package-lock.json /code

RUN npm install

ADD . /code

CMD [ "npm", "start" ]
