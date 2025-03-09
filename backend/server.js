const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors({
    origin: '*'
}));

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Check pool connectivity and retry if necessary
const checkPoolConnection = async () => {
    try {
        const client = await pool.connect();
        client.release();
        console.log("Connected to database using pool");
    } catch (err) {
        console.error("Failed to connect to database, retrying in 5 seconds...", err);
        setTimeout(checkPoolConnection, 5000);
    }
};

checkPoolConnection();

app.get('/todos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM todos');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching todos');
    }
});

app.get('/ping', async (req, res) => {
    return res.send("pong");
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});