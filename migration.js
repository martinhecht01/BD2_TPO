const db = require('./api-related/db'); // Import the database connection
const fs = require('fs');

async function JSONClients() {
    const clients = await db.getClients();
    const toRet = [];

    for (const client of clients) {
        toRet.push({
            _id: client.nro_cliente,
            nombre: client.nombre,
            apellido: client.apellido,
            direccion: client.direccion,
            activo: client.activo
        });
    }

    fs.writeFile('clients.json', JSON.stringify(toRet, null, 2), (err) => {
        if (err) throw err;
        console.log('Data has been written to the file.');
    });
}

async function JSONProducts() {
    const products = await db.getProducts();
    const toRet = [];

    for (const product of products) {
        toRet.push({
            _id: product.codigo_producto,
            marca: product.marca,
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio,
            stock: product.stock
        });
    }

    fs.writeFile('products.json', JSON.stringify(toRet, null, 2), (err) => {
        if (err) throw err;
        console.log('Data has been written to the file.');
    });
}

async function JSONPhones() {
    const phones = await db.getPhones();
    const toRet = [];

    for (const phone of phones) {
        toRet.push({
            codigo_area: phone.codigo_area,
            nro_telefono: phone.nro_telefono,
            nro_cliente: phone.nro_cliente,
            tipo: phone.tipo
        });
    }

    fs.writeFile('phones.json', JSON.stringify(toRet, null, 2), (err) => {
        if (err) throw err;
        console.log('Data has been written to the file.');
    });
}

async function JSONFacturas() {
    const facturas = await db.getFacturas();
    const toRet = [];

    for (const factura of facturas) {
        const detallesAux = await db.getFacturaDetails(factura.nro_factura);
        const detalles = detallesAux.map(detalle => ({
            codigo_producto: detalle.codigo_producto,
            cantidad: detalle.cantidad,
            nro_item: detalle.nro_item
        }));

        toRet.push({
            _id: factura.nro_factura,
            fecha: factura.fecha,
            total_sin_iva: factura.total_sin_iva,
            iva: factura.iva,
            total_con_iva: factura.total_con_iva,
            nro_cliente: factura.nro_cliente,
            detalles: detalles
        });
    }

    fs.writeFile('tickets.json', JSON.stringify(toRet, null, 2), (err) => {
        if (err) throw err;
        console.log('Data has been written to the file.');
    });
}

JSONFacturas();
JSONPhones();
JSONProducts();
JSONClients();
