use E01;
db.createUser({user: "username2", pwd: "password", roles: [ { role: "readWrite", db: "E01" } ]});
db.auth("username2", "password");
mongoimport --db E01 --collection phones --jsonArray --file /phones.json;
mongoimport --db E01 --collection tickets --jsonArray --file /tickets.json;
mongoimport --db E01 --collection clients --jsonArray --file /clients.json;
mongoimport --db E01 --collection products --jsonArray --file /products.json;
