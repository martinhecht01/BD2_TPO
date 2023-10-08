const express = require('express');
const app = express();
const port = process.env.PORT || require('./config.json').port;
const pgp = require('pg-promise')();
const config = require('./config.json').database;

const db = pgp({
  user: config.user,
  password: config.password,
  host: config.host,
  port: config.port,
  database: config.database
});

// Middleware to parse JSON requests
app.use(express.json());

// Set up a basic route
app.get('/', (req, res) => {
  res.send('Esta es la API del TP de BD2!');
});

// Example route to fetch data from the database
app.get('/clients', async (req, res) => {
  try {
    const clients = await db.any('SELECT * FROM e01_cliente');
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data from the database.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
