// import dotenv from 'dotenv';
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 8000;  

//what is this
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    optionsSuccessStatus: 200,
};

// database connection
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

app.use(cors(corsOptions));
app.use(express.json());

//ROUTES//

//create a stack

app.post('/api/stacks', async (req, res) => {
    try {
        const { title, description, items } = req.body;
        const newStack = await pool.query(
            'INSERT INTO stacks (title, description) VALUES ($1, $2) RETURNING *',
            [title, description]
        );

        const stackId = newStack.rows[0].id;

        const itemPromises = items.map(item =>
            pool.query(
                'INSERT INTO items (stack_id, item_type, content) VALUES ($1, $2, $3) RETURNING *',
                [stackId, item.item_type, item.content]
            )
        );

        await Promise.all(itemPromises);

        res.json(newStack.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// get all stacks with items
app.get('/api/stacks', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                s.id as stack_id,
                s.title,
                s.description,
                s.created_at as stack_created_at,
                s.updated_at as stack_updated_at,
                i.item_id,
                i.item_type,
                i.content,
                i.created_at as item_created_at,
                i.updated_at as item_updated_at
            FROM stacks s
            LEFT JOIN items i ON s.id = i.stack_id
        `);

        const stacks = {};

        result.rows.forEach(row => {
            if (!stacks[row.stack_id]) {
                stacks[row.stack_id] = {
                    id: row.stack_id,
                    title: row.title,
                    description: row.description,
                    created_at: row.stack_created_at,
                    updated_at: row.stack_updated_at,
                    items: []
                };
            }

            if (row.item_id) {
                stacks[row.stack_id].items.push({
                    id: row.item_id,
                    item_type: row.item_type,
                    content: row.content,
                    created_at: row.item_created_at,
                    updated_at: row.item_updated_at
                });
            }
        });

        res.json(Object.values(stacks));
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//get a stack

//update a stack

//delete a stack

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
