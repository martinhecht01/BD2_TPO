const express = require('express');
const router = express.Router();
const { createClient, deleteClient, modifyClient, getClients, connectToMongo } = require('../db');

// Create a new client
router.post('/', async (req, res) => {
  try {
    const {nro_cliente, nombre, apellido, direccion, activo } = req.body;
    const newClient = await createClient({nro_cliente, nombre, apellido, direccion, activo });
    res.status(201).json(newClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the client.' });
  }
});

// Delete a client
router.delete('/:nro_cliente', async (req, res) => {
  try {
    const { nro_cliente } = req.params;
    const deletedClient = await deleteClient(nro_cliente);
    res.status(200).json(deletedClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the client.' });
  }
});

// Modify a client
router.put('/:nro_cliente', async (req, res) => {
  try {
    const { nro_cliente } = req.params;
    const { nombre, apellido, direccion, activo } = req.body;
    const modifiedClient = await modifyClient({ nro_cliente, nombre, apellido, direccion, activo });
    res.status(200).json(modifiedClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while modifying the client.' });
  }
});

// Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await getClients();
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving clients.' });
  }
});


// ---------- MONGO ----------

router.post('/mongo', async (req, res) => {
  let db;
  try {
    const {nombre, apellido, direccion, activo } = req.body;
    db = await connectToMongo();
    // get the last id, not the last user, just the last id
    const maxDocument = await db.collection('clients').findOne({}, { sort: { _id: -1 } });
    max_id = maxDocument ? maxDocument._id : 0;
    max_id += 1;

    const newClient = {
      _id: max_id,
      nombre,
      apellido,
      direccion,
      activo,
    };

    const result = await db.collection('clients').insertOne(newClient);
    const insertedUser = result.ops;

    // Respond with the inserted user and a success message
    res.status(201).json({ user: insertedUser, message: 'User created successfully.' });

    console.log(`User with _id ${newClient._id} has been created.`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the client.' });
  } 
});

module.exports = router;

