import express from "express";
import inputRouter from "./routes/input.js";
import outputRouter from "./routes/output.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 4600;

app.use(cookieParser());

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
