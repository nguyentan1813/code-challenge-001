# Stage 1: Build TypeScript
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source
COPY . .

# Build TypeScript -> JavaScript
RUN npm run build

# Stage 2: Run app
FROM node:22-alpine

WORKDIR /app

# Copy only dist + node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Expose port (API)
EXPOSE 4000

# Run the app
CMD ["node", "dist/problem5/server.js"]
