import express from "express";
import inputRouter from "./routes/input.js";
import outputRouter from "./routes/output.js";

const app = express();
const port = 4600;

//Mongoose setup
import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/database_name')
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.error("Failed to connect to MongoDB", err);
});

const stockSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true,
        unique: true // Guarantees each stock symbol is only added once
    },
    // This array will hold the historical data
    priceHistory: [{
        date: { type: Date, required: true },
        price: { type: Number, required: true }
    }]
});

const Stock = mongoose.model('Stock', stockSchema);

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    watchlist: [{
        // Use the 'Schema' variable you defined above
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stock' // This points to the Stock model
    }]
});

const User = mongoose.model('User', userSchema);

// Middleware (so app can read JSON body)
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.send("Login PLease");
});

// Mount routers
app.use("/api/input", inputRouter);
app.use("/api/output", outputRouter);

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
