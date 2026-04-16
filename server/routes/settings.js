import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// GET all settings
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM settings');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT update setting
router.put('/:key', async (req, res) => {
    const { key } = req.params;
    const { value } = req.body;
    try {
        await db.query('UPDATE settings SET setting_value = ? WHERE setting_key = ?', [value, key]);
        res.json({ message: 'Setting updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
