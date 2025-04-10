FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Set build arguments for environment variables
ARG NEXT_PUBLIC_API_BASE_URL
ARG API_BASE_URL

# Set environment variables
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV API_BASE_URL=$API_BASE_URL

# Copy the rest of the application code
COPY . .    

# Build the application with environment variables
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]