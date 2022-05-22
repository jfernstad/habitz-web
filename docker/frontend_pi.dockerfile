FROM arm64v8/nginx:1.20
RUN apk --no-cache add ca-certificates sqlite
ADD ./html /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
