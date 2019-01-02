FROM keymetrics/pm2:latest-alpine

# Bundle APP files
RUN mkdir -p /var/ellen
WORKDIR /var/ellen
COPY api ./api
COPY core ./core
COPY package.json .

RUN ls -al -R

ENV NPM_CONFIG_LOGLEVEL warn
RUN yarn --production

EXPOSE 9292

CMD pm2 start --no-daemon /var/ellen/api/index.js --log-date-format "YYYY-MM-DD HH:mm Z" --merge-logs --restart-delay 1500
