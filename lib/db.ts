import mongoose from "mongoose";

let isConnected = false; // Track the connection state

const connect = async () => {
  if (isConnected) {
    return; // If already connected, skip reconnection
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("No Database URI provided");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 20000, // Optional: Increase timeout
    });
    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to Database");
  } catch (error: any) {
    console.error("Error connecting to Database:", error.message);
    throw new Error("Database connection failed");
  }
};

export default connect;
