import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';

const PORT = process.env.PORT || 4000;
const app = express();

const startServer = async () => {
  try {
    await connectDB();

    // Middleware
    app.use(express.json());
    app.use(cors({ origin: '*' })); // Allows all origins; adjust as needed

    // API routes
    app.get('/', (req, res) => res.send('API Working'));

    app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
