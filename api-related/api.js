const express = require('express');
const app = express();
const port = process.env.PORT || require('./config.json').port;
const db = require('./db'); // Import the database connection

// Middleware to parse JSON requests
app.use(express.json());

// Import and use the clients router
const clientsRouter = require('./routes/clients');
app.use('/clients', clientsRouter);

// Set up a basic route
app.get('/', (req, res) => {
  res.send('Esta es la API del TP de BD2!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

