import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// GET all active menus
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM sidebar_menus WHERE is_active = 1 ORDER BY display_order ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
