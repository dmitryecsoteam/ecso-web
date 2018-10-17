FROM node:carbon AS base

# Create directory
WORKDIR /app

# Copy all files from current directory
COPY . ./

# Install dependencies and build static files in public folder
RUN yarn install
RUN yarn build


# Production image 
FROM node:8.11-alpine AS release

# Listen port
EXPOSE 3000

# Set working directory for run, copy & cmd commands
WORKDIR /app

# Copy package.json, server.js and static files
COPY --from=base /app/package.json /app/yarn.lock ./
COPY --from=base /app/server ./server
COPY --from=base /app/public ./public

# Install dependencies to run server
RUN yarn install --production=true

# Start server
CMD ["node", "server/server.js"]