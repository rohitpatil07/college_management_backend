# Use the official Node.js image with Node.js 16
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

COPY prisma/ prisma/
# Install dependencies
RUN yarn 

#Configure mysql tables
RUN yarn prisma db push --schema=./prisma/schema.prisma
RUN yarn prisma generate

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your Express app will run on
EXPOSE 5000

# Install wait-for-it
RUN apt-get update && apt-get install -y wait-for-it

# Wait for the database to be ready before executing Prisma migrations and seeding
#Use this cmd at first deployment
CMD ["wait-for-it", "db:3306", "--", "yarn", "prisma", "db", "push", "&&", "yarn", "prisma:seed","&&", "yarn", "start"]

#UNcomment this for next iterations
# CMD ["yarn", "dev"]
