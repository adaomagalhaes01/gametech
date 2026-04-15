import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import budgetRoutes from './routes/budget.js';
import userRoutes from './routes/users.js';
import itemRoutes from './routes/items.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/budget', budgetRoutes);
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);

app.get('/', (req, res) => {
    res.send('GameTech API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
