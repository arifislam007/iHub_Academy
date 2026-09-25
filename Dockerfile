FROM node:20-alpine AS build

WORKDIR /app

# Install exactly the locked dependency versions
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Build frontend with optional API URL (leave empty to resolve at runtime)
ARG VITE_API_URL=
ENV VITE_API_URL=$VITE_API_URL

# Files in public/ (brochure PDF, linux_info.html) are copied into dist/ by Vite
RUN pnpm build

FROM nginx:1.27-alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/security-headers.conf nginx/api-proxy.conf /etc/nginx/snippets/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
