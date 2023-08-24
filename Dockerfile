# Build stage
FROM node:14.17-alpine as build

WORKDIR /app

COPY package.json ./

ARG VITE_URL=${VITE_URL}
ARG VITE_TOKEN_TRACKER=${VITE_TOKEN_TRACKER}
ARG VITE_YANDEX_MAPS_API_KEY=${VITE_YANDEX_MAPS_API_KEY}

ENV VITE_URL=${VITE_URL}
ENV VITE_TOKEN_TRACKER=${VITE_TOKEN_TRACKER}
ENV VITE_YANDEX_MAPS_API_KEY=${VITE_YANDEX_MAPS_API_KEY}

RUN npm install

COPY . .

RUN npm run build --verbose

# Staging
FROM nginx:1.21-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Copy NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]