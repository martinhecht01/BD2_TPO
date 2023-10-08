const pgp = require('pg-promise')();
const config = require('./config.json').database;

const db = pgp({
  user: config.user,
  password: config.password,
  host: config.host,
  port: config.port,
  database: config.database
});

// Function to create a new client
async function createClient(clientData) {
  try {
    const {nro_cliente, nombre, apellido, direccion, activo } = clientData;
    const query = `
      INSERT INTO E01_CLIENTE (nro_cliente, nombre, apellido, direccion, activo)
      VALUES ($1, $2, $3, $4,$5)
      RETURNING *;
    `;
    const values = [nro_cliente, nombre, apellido, direccion, activo];

    const result = await db.one(query, values);
    return result;
  } catch (error) {
    throw error;
  }
}

// Function to delete a cliente
async function deleteClient(nro_cliente) {
  try {
    const query = `
      DELETE FROM E01_CLIENTE
      WHERE nro_cliente = $1
      RETURNING *;
    `;
    const values = [nro_cliente];

    const result = await db.one(query, values);
    return result;
  } catch (error) {
    throw error;
  }
}

// Function to modify a client
async function modifyClient(clientData) {
  try {
    const {nro_cliente, nombre, apellido, direccion, activo } = clientData;
    const query = `
      UPDATE E01_CLIENTE
      SET nombre = $2, apellido = $3, direccion = $4, activo = $5
      WHERE nro_cliente = $1
      RETURNING *;
    `;
    const values = [nro_cliente, nombre, apellido, direccion, activo];

    const result = await db.one(query, values);
    return result;
  } catch (error) {
    throw error;
  }
}

// Function to get all clients
async function getClients(){
    try {
        const query = `
            SELECT * FROM E01_CLIENTE;
        `;
        const result = await db.any(query);
        return result;
    } catch(error) {
        throw error;
    }
}

// Function to get all products
async function getProducts(){
    try {
        const query = `
            SELECT * FROM E01_PRODUCTO;
        `;
        const result = await db.any(query);
        return result;
    } catch(error) {
        throw error;
    }
}

// Function to create a new product
async function createProduct(productData) {
  try {
    const {codigo_producto, marca, nombre, descripcion, precio, stock} = productData;
    const query = `
      INSERT INTO E01_PRODUCTO (codigo_producto, marca, nombre, descripcion, precio, stock)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [codigo_producto, marca, nombre, descripcion, precio, stock];

    const result = await db.one(query, values);
    return result;
  } catch (error) {
    throw error;
  }
}

// Function to modify a product
async function modifyProduct(productData){
    try {
        const {codigo_producto, marca, nombre, descripcion, precio, stock} = productData;
        const query = `
            UPDATE E01_PRODUCTO
            SET marca = $2, nombre = $3, descripcion = $4, precio = $5, stock = $6
            WHERE codigo_producto = $1
            RETURNING *;
        `;
        const values = [codigo_producto, marca, nombre, descripcion, precio, stock];

        const result = await db.one(query, values);
        return result;
    }catch(error){
        throw error;
    }
}

module.exports = {
  createClient,
  deleteClient,
  modifyClient,
  getClients,
  getProducts,
  createProduct,
  modifyProduct,
  db, // You can also export the db object for other queries
};
