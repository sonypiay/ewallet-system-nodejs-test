FROM node:20

RUN mkdir -p /home/node && chown -R node:node /home/node
COPY app /home/node/app
RUN chown -R node:node /home/node/app

WORKDIR /home/node/app
USER node
RUN npm install
RUN npx prisma generate
RUN rm -rf /home/node/app/app
COPY --chown=node:node . .

EXPOSE 3000
CMD [ "node", "/home/node/app/src/main.js" ]