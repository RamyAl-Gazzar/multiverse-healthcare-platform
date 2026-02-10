import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import studyRoutes from './routes/studyRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

import gaharRoutes from './routes/gaharRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/studies', studyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes); // Added contentRoutes use
app.use('/api/gahar', gaharRoutes);
app.use('/api/assessments', assessmentRoutes);

app.get('/', (req, res) => {
    res.send('Multiverse Healthcare API is running...');
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
