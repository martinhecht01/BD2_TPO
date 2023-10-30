// Consulta 1: la parte de project se puede acortar

db.clients.aggregate([
    {
        $lookup: {
            from: "phones",
            localField: "_id",
            foreignField: "nro_cliente",
            as: "clientPhones"
        }
    },
    {
        $match: {
            nombre: "Wanda",
            apellido: "Baker"
        }
    },
    {
        $unwind: "$clientPhones"
    },
    {
        $project: {
            _id: 0,  // Exclude the _id field
            client_id: "$_id",  // Rename _id to client_id
            client_name: "$nombre",  // Include client name
            client_lastname: "$apellido",  // Include client last name
            codigo_area: "$clientPhones.codigo_area",
            nro_telefono: "$clientPhones.nro_telefono"
        }
    }
])

// Ejercicio 2
db.clients.aggregate([
    {
        $lookup:{
            from: "tickets",
            localField: "_id",
            foreignField: "nro_cliente",
            as: "clientsTickets"
        }
    },
    {
        $match: {
            "clientsTickets": {$ne: []}
        }
    }
])

// Ejercicio 3
db.clients.aggregate([
    {
        $lookup:{
            from: "tickets",
            localField: "_id",
            foreignField: "nro_cliente",
            as: "clientsTickets"
        }
    },
    {
        $match: {
            "clientsTickets": {$eq: []}
        }
    }
])

// Ejercicio 4
db.products.aggregate([
    {
        $lookup:{
            from: "tickets",
            localField: "_id",
            foreignField: "_id",
            as: "factura"
        }
    },
    {
        $match:{
            factura: {$ne: []}
        }
    },
    {
        $project:{
            nombre: 1,
            marca: 1,
            _id: 0
        }
    }
]);

// Ejercicio 5
db.clients.aggregate([
    {
        $lookup: {
            from: "phones",
            localField: "_id",
            foreignField: "nro_cliente",
            as: "clientPhones"
        }
    },
    {
        $unwind: "$clientPhones"
    },
    {
        $project: {
            _id: 0,  // Exclude the _id field
            client_id: "$_id",  // Rename _id to client_id
            client_name: "$nombre",  // Include client name
            client_lastname: "$apellido",  // Include client last name
            codigo_area: "$clientPhones.codigo_area",
            nro_telefono: "$clientPhones.nro_telefono",
        }
    }
])
