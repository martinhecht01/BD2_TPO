const express = require('express');
const router = express.Router();
const { createProduct, modifyProduct, getProducts } = require('../db');

// Create a new product
router.post('/', async (req, res) => {
  try {
    const { codigo_producto, marca, nombre, descripcion, precio, stock } = req.body;
    const newProduct = await createProduct({codigo_producto, marca, nombre, descripcion, precio, stock});
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the product.' });
  }
});

// Modify a product
router.put('/:codigo_producto', async (req, res) => {
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
router.get('/', async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving products.' });
  }
});

module.exports = router;
