import mongoose from 'mongoose';

const connectDB = async () => {
    try {
       const MONGO_URI ='mongodb+srv://anshhpasriccha46:kbe5Yllrnwt7n1ll@cluster0.4ivejh0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(process.env.MONGO_URI || MONGO_URI);
        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1); // Exit if connection fails
    }
};

export default connectDB;