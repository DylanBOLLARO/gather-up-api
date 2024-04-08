#build
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build


#production
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install --only=production

CMD [ "npm", "run", "start:prod" ]