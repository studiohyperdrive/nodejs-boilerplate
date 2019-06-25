### BASE ###
FROM node:dubnium-alpine as base

# Install latest npm version
RUN npm i --global --silent npm@latest

### BUILDER STAGE ###
FROM base as builder

# Install dependencies
WORKDIR /app
COPY package*.json .npmrc ./
RUN npm ci --silent
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
COPY package*.json .npmrc ./
RUN npm ci --production --silent && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH

# Copy built source code
WORKDIR /app/server
COPY --from=builder /app/server/tsconfig*.json ./
COPY --from=builder /app/server/dist ./

CMD node -r tsconfig-paths/register index.js
