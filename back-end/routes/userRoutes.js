// back-end\routes\userRoutes.js
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Course from "../models/Course.js";

const router = express.Router();

// Add Course to User's Enrolled Courses
router.post("/enroll", authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the course is already enrolled
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "Course already enrolled" });
    }

    // Add the course to the user's enrolledCourses
    user.enrolledCourses.push(courseId);
    await user.save();

    res.json({ message: "Course enrolled successfully!", user });
  } catch (error) {
    res.status(500).json({ message: "Error enrolling course", error: error.message });
  }
});

// Remove Course from User's Enrolled Courses
router.post("/unenroll", authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the course from the user's enrolledCourses
    user.enrolledCourses = user.enrolledCourses.filter(
      (course) => course.toString() !== courseId
    );
    await user.save();

    res.json({ message: "Course unenrolled successfully!", user });
  } catch (error) {
    res.status(500).json({ message: "Error unenrolling course", error: error.message });
  }
});

// Get User's Enrolled Courses
router.get("/enrolled-courses", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.enrolledCourses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching enrolled courses", error: error.message });
  }
});

export default router;