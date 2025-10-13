import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/database_name');
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1); // Exit if connection fails
    }
};

export default connectDB;