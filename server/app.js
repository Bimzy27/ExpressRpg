const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require('mysql2');

const PORT = process.env.PORT || 8080;

app.use(express.static("build"));

// Middleware
//app.use(cors());

// MySQL connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '2170',
  database: 'rpggame'
});

// API endpoint
app.get('/api/data', (req, res) => {
  pool.query('SELECT * FROM enemies', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching data' });
    } else {
      res.json(results);
    }
  });
});

const items = [
  {
    name: "Laptop",
    price: 500,
  },
  {
    name: "Desktop",
    price: 700,
  },
];

app.get("/api/items", (req, res) => {
  res.send(items);
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));