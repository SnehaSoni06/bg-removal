// import mongoose from 'mongoose';

// const connectDB = async ()=>{

//     mongoose.connection.on('connected',()=>{
//         console.log("Database Connected");
//     })

//     await mongoose.connect(`${process.env.MONGODB_URI}/bg-removal`)
// }
// export default connectDB

import mongoose from "mongoose";

let isConnected = false; // Track the connection status

 const connectDB = async () => {

  if (isConnected) return;
  
  try {
    
    
      console.log("Connecting to MongoDB...");
      await mongoose.connect(process.env.MONGODB_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
        socketTimeoutMS: 45000,         // Socket timeout increased
        connectTimeoutMS: 10000         // Connect timeout increased
      });
      isConnected = true;
      console.log("MongoDB connection successful.");
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw new Error("Database connection error.");
  }
};
export default connectDB;
