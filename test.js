import mongoose from 'mongoose';

// 1. IMPORT YOUR USER MODEL (Adjust the path if necessary)
import user from './models/user.js';

// 2. SET YOUR DATABASE CONNECTION STRING
const MONGO_URI = 'mongodb://127.0.0.1:27017/database_name';

// 3. MAIN FUNCTION TO CONNECT, FETCH, AND PRINT DATA
async function fetchAllUsers() {
    try {
        // Connect to the database
        await mongoose.connect(MONGO_URI);
        console.log("✅ Successfully connected to MongoDB.");

        // Fetch all documents from the 'users' collection
        const allUsers = await user.find({});

        // Check if any users were found
        if (allUsers.length === 0) {
            console.log("🟡 No users found in the database.");
        } else {
            console.log("--- All Users in the Database ---");
            // Print the data in a readable JSON format
            console.log(JSON.stringify(allUsers, null, 2));
        }

    } catch (error) {
        console.error("❌ Error connecting to or fetching from database:", error.message);
    } finally {
        // Disconnect from the database after the operation is complete
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB.");
    }
}

// Run the function
fetchAllUsers();