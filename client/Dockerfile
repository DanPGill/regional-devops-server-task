# Use a lightweight image with nginx
FROM nginx:alpine

# Copy built Vite assets to nginx html directory
COPY ./dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
