// back-end\middleware\authMiddleware.js
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token:", token); // Debug log

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded;  
    next();
  } catch (error) {
    console.error("❌ JWT Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default authMiddleware;