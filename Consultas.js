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


// Ejercicio 6
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
        $project:{
            nombre: 1,
            apellido: 1,
            count: {$size: "$clientsTickets"}
        }
    }
])

// Ejercicio 7
db.clients.aggregate([
    {
        $lookup:{
            from: "tickets",
            foreignField: "nro_cliente",
            localField: "_id",
            as: "clientTickets"
        }
    },
    {
        $match: {
            nombre: "Pandora",
            apellido: "Tate"
        }
    },
    {
        $unwind: "$clientTickets"
    },
    {
        $project: {
            nombre: 1,
            apellido: 1,
            factura_datos: {
                id: "$clientTickets._id",
                fecha_factura: "$clientTickets.fecha"
            }
        }
    }
])

//Ejercicio 8
db.tickets.aggregate([
    {
        $lookup: {
            from: "products",
            localField: "detalles.codigo_producto",
            foreignField: "_id",
            as: "ticketAndProduct"
        }
    },
    {
        $match: {
            "ticketAndProduct.marca": "In Faucibus Inc."
        }
    }
])

// Ejercicio 9
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
            client_name: "$nombre",  // Include client name
            client_lastname: "$apellido",  // Include client last name
            codigo_area: "$clientPhones.codigo_area",
            nro_telefono: "$clientPhones.nro_telefono"
        }
    }
])

//Ejercicio 10
db.clients.aggregate([
    {
        $lookup: {
            from: "tickets",
            localField: "_id",
            foreignField: "nro_cliente",
            as: "clientsTickets"
        }
    },
    {
        $project: {
            _id: 0, // Exclude the _id field from the output
            nombre: 1,
            apellido: 1,
            gasto: {$sum: "$clientsTickets.total_con_iva"}
        }
    }
])

// Vista 1
db.createView(
    "facturas_por_fecha",
    "tickets",
    [{
        $sort: {
            fecha: 1
        }
    }]
)


//Vista 2
db.createView(
    "productos_no_facturados",
    "products",
    [
        {
            $lookup: {
                from: "tickets",
                foreignField: "detalles.codigo_producto",
                localField: "_id",
                as: "ticketsAndProducts"
            }
        },
        {
            $match: {
                ticketsAndProducts: {$eq: []}
            }
        }
    ]
)
