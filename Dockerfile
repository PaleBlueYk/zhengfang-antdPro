FROM node:14.4.0
EXPOSE 3031
WORKDIR /app/html
COPY ./ /app/html
RUN npm config set registry http://registry.npm.taobao.org/
RUN npm install pm2 -g
RUN npm install
RUN npm build
RUN rm -rf ./node_modules
CMD ["pm2-docker", "app.js"]