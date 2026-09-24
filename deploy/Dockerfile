FROM node:22-alpine
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --omit=dev --no-fund --no-audit
COPY backend/src ./src
COPY backend/migrations ./migrations
COPY backend/scripts/migrate.js ./scripts/migrate.js
COPY frontend/build /app/frontend/build
COPY frontend/src/pictures /app/frontend/src/pictures
COPY frontend/public/pictures /app/frontend/public/pictures
RUN mkdir -p /app/backend/uploads && chown node:node /app/backend/uploads
ENV NODE_ENV=production PORT=8080 NODE_OPTIONS=--max-old-space-size=192
USER node
CMD ["sh","-c","node scripts/migrate.js && node src/server.js"]
