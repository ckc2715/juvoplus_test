FROM node as builder

RUN npm install --location=global nodemon
# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package.json yarn.lock tsconfig.json ./
COPY .env ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# stage 2
FROM node:slim as production

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package.json yarn.lock ./
COPY .env ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder /usr/app/build ./build

ENV NODE_PATH=./build

EXPOSE 3000
CMD [ "node", "build/index.js" ]