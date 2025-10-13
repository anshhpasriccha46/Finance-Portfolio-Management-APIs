import express from "express";
import inputRouter from "./routes/input.js";
import outputRouter from "./routes/output.js";
import connectDB from "./config/db.js";

const app = express();
const port = 4600;


// Middleware (so app can read JSON body)
app.use(express.json());

connectDB();

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
