import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import budgetRoutes from './routes/budget.js';
import userRoutes from './routes/users.js';
import itemRoutes from './routes/items.js';
import menuRoutes from './routes/menus.js';
import settingRoutes from './routes/settings.js';
import db from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/budget', budgetRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/settings', settingRoutes);

app.get('/', (req, res) => {
    res.send('GameTech API is running...');
});

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await db.query('SELECT 1');
        console.log('Database connected successfully!');
    } catch (err) {
        console.error('CRITICAL: Database connection failed!');
        console.error(err.message);
    }
});
