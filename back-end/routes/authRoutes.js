import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    let { username, email, password, mobile } = req.body;
    if (!username || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    email = email.toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "❌ User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword, mobile });
    await newUser.save();
    res.status(201).json({ message: "✅ Registration successful!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    console.log(req.body); // Debugging: Log request body

    const { phone, password } = req.body; // Destructure values

    if (!phone || !password) {
      return res.status(400).json({ message: "Mobile & password required!" });
    }

    const mobile = phone.trim(); // Trim to remove spaces
    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(400).json({ message: "Incorrect mobile or password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect mobile or password!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    }).json({
      message: "Login successful",
      user: { id: user._id, username: user.username, email: user.email, mobile: user.mobile },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
