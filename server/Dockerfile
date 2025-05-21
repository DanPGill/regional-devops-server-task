# Use official Node image
FROM node:18-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set work directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy source files
COPY . .

# Build TypeScript
RUN pnpm run build

# Expose WebSocket port
EXPOSE 8080

# Start server
CMD ["pnpm", "start"]
