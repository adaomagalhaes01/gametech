import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// GET all budget requests
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM budget_requests ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST new budget request
router.post('/', async (req, res) => {
    const { name, email, phone, service, description } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO budget_requests (name, email, phone, service, description) VALUES (?, ?, ?, ?, ?)',
            [name, email, phone, service, description]
        );
        res.status(201).json({ id: result.insertId, name, email, phone, service, description });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PATCH update status
router.patch('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await db.query('UPDATE budget_requests SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'Status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE request
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM budget_requests WHERE id = ?', [id]);
        res.json({ message: 'Request deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
