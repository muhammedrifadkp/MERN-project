// back-end\routes\courseRoutes.js
import express from "express";
import multer from "multer";
import Course from "../models/Course.js";

const router = express.Router();

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// ✅ Add Course Route (with File Upload)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { title, description, instructor, price } = req.body;

    if (!title || !description || !instructor || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newCourse = new Course({
      title,
      description,
      instructor,
      price,
      imageUrl,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding course", error: error.message });
  }
});

// ✅ Get All Courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
});

// ✅ Get Course By ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error: error.message });
  }
});

// ✅ Update Course
router.put("/:id", async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error: error.message });
  }
});

// ✅ Delete Course
router.delete("/:id", async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ message: "Course not found" });

    res.json({ message: "Course deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error: error.message });
  }
});

export default router;
