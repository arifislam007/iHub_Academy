FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Build frontend with optional API URL (leave empty to resolve at runtime)
ARG VITE_API_URL=
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM nginx:1.27-alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html
COPY sombhabona_courses.pdf /usr/share/nginx/html/sombhabona_courses.pdf
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]