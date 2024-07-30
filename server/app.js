const express = require("express");
const app = express();
const mysql = require('mysql2');

const PORT = process.env.PORT || 8080;

app.use(express.static("build"));

// MySQL connection
const pool = mysql.createPool({host: 'localhost', user: 'root', password: '2170', database: 'rpggame'});

// API endpoint
app.get('/api/data/enemies', (req, res) => {
	pool.query('SELECT * FROM enemies', (err, results) => {
		if (err) {
			console.error(err);
			res.status(500).json({error: 'Error fetching data'});
		} else {
			res.json(results);
		}
	});
});

app.get('/api/data/locations', (req, res) => {
	pool.query('SELECT * FROM locations', (err, results) => {
		if (err) {
			console.error(err);
			res.status(500).json({error: 'Error fetching data'});
		} else {
			res.json(results);
		}
	});
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));