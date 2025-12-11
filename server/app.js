// server\app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(cookieParser());

// ========== API ROUTES ==========
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// Test protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

export default app;
