FROM node:alpine

WORKDIR /app

COPY build ./

RUN npm -g install serve

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]