import express from "express";
import inputRouter from "./Routes/input.js";
import outputRouter from "./Routes/output.js";

const app = express();
const port = 4600;

// Middleware (so app can read JSON body)
app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.send("Welcome to Stock Market API 🚀");
});

// Mount routers
app.use("/api/input", inputRouter);
app.use("/api/output", outputRouter);

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
