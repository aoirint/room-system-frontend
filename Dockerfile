FROM node:14

ARG HTTP_PROXY
ARG HTTPS_PROXY

WORKDIR /code
RUN chown -R node:node /code

USER node

ADD ./package.json /code
ADD ./package-lock.json /code

RUN npm install

ADD . /code

CMD [ "npm", "start" ]
