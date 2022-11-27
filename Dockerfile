FROM node as jsbuilder

COPY . /app
WORKDIR /app

RUN npm install

# ---------------------------------------------------------

FROM node:18.6-alpine

COPY --from=jsbuilder /app /app

WORKDIR /app

EXPOSE 3000
ENTRYPOINT [ "node", "index.js" ]
