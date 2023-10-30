#!/bin/bash

#docker pull mongo
#docker run -d -p 27017:27017 --name mongodb mongo

# Copy JSON files into the MongoDB container
docker cp ./tickets.json mongodb:/
docker cp ./clients.json mongodb:/
docker cp ./phones.json mongodb:/
docker cp ./products.json mongodb:/

# Execute MongoDB commands in the MongoDB container
docker cp ./migration-script.js mongodb:/
docker exec -it mongodb bash -c 'mongosh -f ./migration-script.js'

# Remove the MongoDB container after the import
# docker stop mongodb
# docker rm mongodb



