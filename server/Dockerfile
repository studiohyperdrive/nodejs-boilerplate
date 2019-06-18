### BASE ###
FROM node:dubnium-alpine as base

# Install latest npm version
RUN npm install --global --silent npm@latest

### BUILDER STAGE ###
FROM base as builder

# Install dependencies
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN  npm ci --no-optional --silent
ENV PATH /app/node_modules/.bin:$PATH

# Copy source code
WORKDIR /app/server
COPY ./ ./

# Build source code
RUN npm run build

### RUN STAGE ###
FROM base as run

# Expose port
EXPOSE 80

# Install dependencies (production only)
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN  npm ci --production --no-optional --silent && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH

# Copy built source code
COPY --from=builder /app/server/.env /app/.env
COPY --from=builder /app/server/dist /app

CMD node src/app.js
