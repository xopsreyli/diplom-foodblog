#!/bin/bash

echo 'Removing containers...'
docker rm -f $(docker ps -a -q)

echo 'Building project...'
docker-compose build
docker-compose up -d

docker ps -f name=diplom