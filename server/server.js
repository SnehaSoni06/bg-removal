import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';

// Initialize express app
const app = express();

// Database connection and server initialization
const startServer = async () => {
  try {
    // Wait for DB connection before proceeding
    await connectDB();
    console.log("Database connected successfully");

    // Middleware
    app.use(express.json());
    app.use(cors({ origin: '*' }));

    // API routes
    app.get('/', (req, res) => res.send('API Working'));
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // Exit if server fails to start
  }
};

// Start the server
startServer();

// Export app for Vercel compatibility (Serverless function)
export default app;
