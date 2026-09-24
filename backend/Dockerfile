FROM node:22-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --no-fund --no-audit
COPY frontend/ ./
RUN npm run build

FROM node:22-alpine
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --omit=dev --no-fund --no-audit
COPY backend/ ./
COPY --from=frontend /app/frontend/build /app/frontend/build
COPY frontend/src /app/frontend/src
COPY frontend/public /app/frontend/public
ENV PORT=8080
EXPOSE 8080
RUN mkdir -p /app/backend/uploads && chown node:node /app/backend/uploads
USER node
CMD ["sh","-c","node scripts/migrate.js && node src/server.js"]
