FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
RUN rm -rf node_modules
RUN mv docker/.yarnclean .yarnclean
RUN yarn install --production
RUN yarn autoclean --force

FROM node:18-alpine as bot
COPY --from=build /app /app
WORKDIR /app
CMD ["yarn", "rest", "start"]