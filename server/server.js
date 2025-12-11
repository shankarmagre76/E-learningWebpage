// server/server.js
import dotenv from "dotenv";

// Load .env BEFORE ANYTHING ELSE
dotenv.config();

import connectDB from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

// Connect DB AFTER envs are loaded
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
