FROM nginx:1.21.6-alpine
RUN apk --no-cache add ca-certificates sqlite
ADD ./html /usr/share/nginx/html
ADD ./docker/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
