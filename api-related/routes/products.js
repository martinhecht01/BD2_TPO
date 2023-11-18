const express = require('express');
const router = express.Router();
const { createProduct, modifyProduct, getProducts, connectToMongo } = require('../db');

// Create a new product
router.post('/pg', async (req, res) => {
  try {
    const { codigo_producto, marca, nombre, descripcion, precio, stock } = req.body;
    const newProduct = await createProduct({codigo_producto, marca, nombre, descripcion, precio, stock});
    res.status(201).json({ message: 'Product created successfully.', newProduct});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the product.' });
  }
});

// Modify a product
router.put('/pg/:codigo_producto', async (req, res) => {
  try {
    const { codigo_producto } = req.params;
    const { marca, nombre, descripcion, precio, stock } = req.body;
    const modifiedProduct = await modifyProduct({ codigo_producto, marca, nombre, descripcion, precio, stock });
    res.status(200).json(modifiedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while modifying the product.' });
  }
});

// Get all products
router.get('/pg', async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving products.' });
  }
});

//-------- MONGO ----------

router.post('/mongo', async (req, res) => {
  let db;
  try {
    const {codigo_producto, marca, nombre, descripcion, precio, stock } = req.body;
    db = await connectToMongo();
    const newProduct = await db.collection('products').insertOne({_id: codigo_producto, marca: marca, nombre: nombre, descripcion: descripcion, precio: precio, stock: stock });
    
    res.status(201).json({ message: 'Product created successfully.', product: {codigo_producto, marca, nombre, descripcion, precio, stock }});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the product.' });
  }
});

router.put('/mongo/:codigo_producto', async (req, res) => {
  let db;
  try {
    const { codigo_producto } = req.params;
    const { marca, nombre, descripcion, precio, stock } = req.body;
    db = await connectToMongo();
    const result = await db.collection('products').updateOne({ _id: parseInt(codigo_producto) }, { $set: { marca, nombre, descripcion, precio, stock } });;
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while modifying the product.' });
  }
});

router.get('/mongo', async (req, res) => {
  let db;
  try {
    db = await connectToMongo();
    const products = await db.collection('products').find({}).toArray();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving products.' });
  }
});


module.exports = router;
