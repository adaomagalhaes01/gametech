import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// GET all users
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, name, email, role, status, last_login, created_at FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao carregar usuários', error: error.message });
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
        console.error('Database Error:', error);
        res.status(500).json({
            message: 'Erro ao criar usuário/conta',
            error: error.message,
            code: error.code
        });
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

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        if (rows.length > 0) {
            const user = rows[0];
            delete user.password;

            // Atualizar último login
            await db.query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

            res.json(user);
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE PROFILE (with photo and optional password)
router.put('/profile/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, photo, password } = req.body;
    try {
        if (password) {
            await db.query(
                'UPDATE users SET name = ?, email = ?, photo = ?, password = ? WHERE id = ?',
                [name, email, photo, password, id]
            );
        } else {
            await db.query(
                'UPDATE users SET name = ?, email = ?, photo = ? WHERE id = ?',
                [name, email, photo, id]
            );
        }

        const [rows] = await db.query('SELECT id, name, email, role, photo, status FROM users WHERE id = ?', [id]);
        res.json({ message: 'Profile updated successfully', user: rows[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

