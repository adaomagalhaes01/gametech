import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, email, role, status, last_login, created_at FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new user
router.post('/', async (req, res) => {
    const { name, email, password, role, status } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
            [name, email, password, role, status]
        );
        res.status(201).json({ id: result.insertId, name, email, role, status });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT update user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, role, status } = req.body;
    try {
        await db.query(
            'UPDATE users SET name = ?, email = ?, role = ?, status = ? WHERE id = ?',
            [name, email, role, status, id]
        );
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
