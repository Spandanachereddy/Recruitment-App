// app.js
const express = require('express');
const db = require('./db'); // Adjust the path accordingly

const app = express();

// Define routes, middleware, etc.

app.get('/candidates', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM candidates');
    res.json(rows);
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Other routes and configurations...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
