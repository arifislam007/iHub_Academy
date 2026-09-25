FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

# Install exactly the locked production dependencies
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY backend/server.js ./

# Run as the unprivileged user that ships with the node image
USER node

EXPOSE 3000

CMD ["node", "server.js"]
