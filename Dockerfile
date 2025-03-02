# Use the official Node.js image with Node.js 16
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the Prisma schema to the container
COPY prisma/ ./prisma/

# Generate Prisma client, necessary to interact with the database
RUN yarn prisma generate

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your Express app will run on
EXPOSE 5000

# Optionally install wait-for-it to ensure that the database is ready before starting the app
# RUN apt-get update && apt-get install -y wait-for-it

# Define the command to run your application
# Here we need to handle both initial deployment and subsequent starts
CMD ["sh", "-c", "yarn prisma migrate deploy && yarn start"]
