#!/usr/bin/env bash
# Use this script to start a docker container for a local development database

# TO RUN ON WINDOWS:
# 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
# 2. Install Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
# 3. Open WSL - `wsl`
# 4. Run this script - `./start-database.sh`

# On Linux and macOS you can run this script directly - `./start-database.sh`

if ! [ -x "$(command -v docker-compose)" ]; then
  echo -e "Docker Compose is not installed. Please install Docker Compose and try again.\nDocker Compose install guide: https://docs.docker.com/compose/install/"
  exit 1
fi

# import env variables from .env
set -a
source .env

DB_CONTAINER_NAME=${DB_CONTAINER_NAME:-nextjs-trpc-boilerplate-postgres}
DB_PASSWORD=$(echo "$DATABASE_URL" | awk -F':' '{print $3}' | awk -F'@' '{print $1}')
DB_PORT=$(echo "$DATABASE_URL" | awk -F':' '{print $4}' | awk -F'\/' '{print $1}')

if [ "$DB_PASSWORD" = "password" ]; then
  echo "You are using the default database password"
  read -p "Should we generate a random password for you? [y/N]: " -r REPLY
  if ! [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Please change the default password in the .env file and try again"
    exit 1
  fi
  # Generate a random URL-safe password
  DB_PASSWORD=$(openssl rand -base64 12 | tr '+/' '-_')
  sed -i -e "s#:password@#:$DB_PASSWORD@#" .env
fi

# Export variables for docker-compose
export DB_CONTAINER_NAME DB_PASSWORD DB_PORT

# Check if the container is already running
if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Database container '$DB_CONTAINER_NAME' is already running"
else
  # Start the services defined in docker-compose.yml
  docker-compose up -d

  if [ $? -eq 0 ]; then
    echo "Database container '$DB_CONTAINER_NAME' was successfully created and started"
  else
    echo "Failed to start the database container. Please check the Docker Compose logs for more information."
    exit 1
  fi
fi