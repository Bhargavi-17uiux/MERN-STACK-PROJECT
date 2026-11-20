const mongoose = require('mongoose');

/**
 * Connect to MongoDB with robust connection management
 */
const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/taskflow';
  try {
    const conn = await mongoose.connect(uri);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] Could not connect to MongoDB: ${error.message}`);
    console.warn(`[Database Warning] Running in offline/disconnected database mode. Ensure MONGO_URI is set in .env`);
    return null;
  }
};

module.exports = connectDB;
