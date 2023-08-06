# Build stage
FROM node:14.17-alpine as build

WORKDIR /app

COPY package.json ./

ARG VITE_URL
ARG VITE_TOKEN

ENV VITE_URL="http://trekking.dev.littledevstory.site/api/positions"
ENV VITE_TOKEN="RzBFAiB6NqdyC0AJxtdM9hbbFsPyTYdQeSZ5p_5SGtY8NNEHXQIhAPq7XMmn2K3lptgAvbtdKsCrF6KwZ7CPYtii5btLKiFoeyJ1IjoxLCJlIjoiMjAyNC0xMi0yMlQyMTowMDowMC4wMDArMDA6MDAifQ"

RUN npm install

COPY . .

RUN npm run build --verbose

# Staging
FROM nginx:1.21-alpine

COPY --from=build /app/build /usr/share/nginx/html

# Copy NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]