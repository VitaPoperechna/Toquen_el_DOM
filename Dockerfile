FROM nginx:alpined

COPY . /usr/share/nginx/html

EXPOSE 8080