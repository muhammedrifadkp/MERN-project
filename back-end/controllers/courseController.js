// back-end\controllers\courseController.js
import Course from "../models/Course.js";
import multer from "multer";
import path from "path";

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads/", // Ensure 'uploads' directory exists
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// Ensure `uploads` folder is accessible publicly
export const uploadMiddleware = upload.single("image");

// Add Course Controller
export const addCourse = async (req, res) => {
    try {
      const { title, description, instructor, price } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
  
      if (!title || !description || !instructor || !price || !imageUrl) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newCourse = new Course({ title, description, instructor, price, imageUrl });
      await newCourse.save();
      
      res.status(201).json({ message: "Course added successfully!", course: newCourse });
    } catch (error) {
      res.status(500).json({ message: "Error adding course", error: error.message });
    }
  };
  

// Get All Courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error: error.message });
  }
};

// Get Course By ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error: error.message });
  }
};

// Update Course
export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error: error.message });
  }
};

// Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error: error.message });
  }
};
