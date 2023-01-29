FROM node:18-alpine AS builder

ENV NEW_RELIC_NO_CONFIG_FILE=true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED=true
ENV NEW_RELIC_LOG=stdout

WORKDIR "/app"

COPY package*.json ./
RUN npm ci
COPY . .

FROM node:18-alpine AS build

WORKDIR "/app"

COPY --from=builder package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN npm run build

ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine As production

# Copy the bundled code from the build stage to the production image
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]