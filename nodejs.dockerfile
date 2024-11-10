FROM node:20

RUN mkdir -p /home/node
COPY app /home/node/app

WORKDIR /home/node/app
RUN npm install
RUN npx prisma generate
RUN rm -rf app

EXPOSE 3000
CMD [ "node", "/home/node/app/src/main.js" ]