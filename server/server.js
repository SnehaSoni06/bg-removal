import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongodb.js';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.get('/', (req, res) => res.send("API Working"));

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on Port ${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1); // Exit if DB connection fails
  }
}

startServer();
export default app;