import mongoose from 'mongoose';
import user from './models/user.js';

const MONGO_URI = 'mongodb://127.0.0.1:27017/database_name';

// This function now *only* fetches data
async function fetchAllUsers() {
    console.log("--- All Users in the Database (Before Deletion) ---");
    const allUsers = await user.find({});

    if (allUsers.length === 0) {
        console.log("🟡 No users found in the database.");
    } else {
        console.log(JSON.stringify(allUsers, null, 2));
    }
}

// This function now *only* deletes data
async function deleteAllData() {
    console.log("🟡 Deleting all users...");
    const result = await user.deleteMany({});
    console.log(`✅ Success! Deleted ${result.deletedCount} user(s).`);
}

// A main function to control the connection and the order of operations
async function main() {
    try {
        // 1. Connect ONCE
        await mongoose.connect(MONGO_URI);
        console.log("✅ Successfully connected to MongoDB.");

        // 2. Run the first function and WAIT for it to finish
        await fetchAllUsers();

        // 3. Now, run the second function
        await deleteAllData();

    } catch (error) {
        console.error("❌ An error occurred:", error.message);
    } finally {
        // 4. Disconnect ONCE at the very end
        await mongoose.disconnect();
        console.log("🔌 Disconnected from MongoDB.");
    }
}

// Run the main controller function
main();