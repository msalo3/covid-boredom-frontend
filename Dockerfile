FROM node:12.13.0
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
RUN yarn

COPY . ./

CMD ["yarn", "start"]