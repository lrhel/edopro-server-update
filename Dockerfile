FROM node:stretch

COPY . /srv-update
WORKDIR /srv-update

RUN npm i
RUN mkdir -p cache/Windows cache/Linux cache/Mac

EXPOSE 3000

CMD [ "node", "main.js" ]
