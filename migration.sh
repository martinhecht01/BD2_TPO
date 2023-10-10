#./migration.sh
#docker pull mongo
#docker run -d -p 27017:27017 --name mongodb mongo
# docker cp ./tickets.json mongodb:/
# docker cp ./clients.json mongodb:/
# docker cp ./phones.json mongodb:/
# docker cp ./products.json mongodb:/
# docker exec -it mongodb bash
mongosh
use E01
db.createUser({user: "username2", pwd: "password",roles: [ { role: "readWrite", db: "E01" } ]})
db.auth("username2", "password")
exit
mongoimport --db E01 --collection phones --jsonArray --file phones.json
mongoimport --db E01 --collection tickets --jsonArray --file tickets.json
mongoimport --db E01 --collection clients --jsonArray --file clients.json
mongoimport --db E01 --collection products --jsonArray --file products.json


