FROM nginx:1.21.6-alpine
RUN apk --no-cache add ca-certificates sqlite
ADD ./html /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
