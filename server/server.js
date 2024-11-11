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

    // Only listen on the server locally, not on Vercel
    if (process.env.NODE_ENV !== 'production') {
      const PORT = process.env.PORT || 4000;
      app.listen(PORT, () => {
        console.log(`Server running locally on Port ${PORT}`);
      });
    }
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // Exit if server fails to start
  }
};

// Start the server
startServer();

// Export app for Vercel compatibility (Serverless function)
export default app;