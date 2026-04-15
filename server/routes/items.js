import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// GET all items
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM items ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new item
router.post('/', async (req, res) => {
    const { name, category, price, stock, description, status } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO items (name, category, price, stock, description, status) VALUES (?, ?, ?, ?, ?, ?)',
            [name, category, price, stock, description, status]
        );
        res.status(201).json({ id: result.insertId, name, category, price, stock, status });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE item
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM items WHERE id = ?', [id]);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
