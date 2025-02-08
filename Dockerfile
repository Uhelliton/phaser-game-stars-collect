FROM node:20-alpine

USER root

RUN mkdir /home/node/app

WORKDIR /home/node/app

CMD /bin/sh

