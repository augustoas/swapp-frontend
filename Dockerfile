# Step 1: Use a node base image
FROM node:18.6.0 as build-stage

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Step 4: Install dependencies using Yarn
RUN yarn install

# Step 5: Copy project files into the Docker image
COPY . .

# Step 6: Build the app using Yarn
RUN yarn build

# Step 7: Serve the app
CMD ["yarn", "serve", "--port", "8081"]
