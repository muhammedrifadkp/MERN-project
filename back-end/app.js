// back-end\app.js
import "dotenv/config"; // Load environment variables
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);

// Connect to MongoDB and start the server
connectDB();
app.listen(process.env.PORT || 5000, () => console.log(`✅ Server Running on PORT ${process.env.PORT}`));
