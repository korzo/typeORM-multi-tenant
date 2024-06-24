FROM node:20-alpine AS development
RUN apk add --update --no-cache && apk add curl
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps --only=dev
COPY . .
EXPOSE 3001
RUN npm run build

# Production
FROM node:20-alpine AS production
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN apk add --update --no-cache && apk add curl
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps --only=prod
COPY . .
COPY --from=development /app/dist ./dist

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl --fail http://localhost:3001/api/mirth/ping || exit 1

EXPOSE 3001/tcp
CMD ["node", "dist/main"] 