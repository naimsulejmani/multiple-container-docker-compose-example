const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors({
    origin: '*'
}));

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

const connectWithRetry = () => {
    client.connect(err => {
        if (err) {
            console.error('Failed to connect to database, retrying in 5 seconds...', err);
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log('Connected to database');
        }
    });
};

connectWithRetry();

app.get('/todos', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM todos');
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