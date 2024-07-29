const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3002;

// Middleware
app.use(cors());

// MySQL connection
const pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});