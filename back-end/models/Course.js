// back-end\models\Course.js
import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  modules: [{ type: String }], // Add modules field
  ratings: { type: Number, default: 0 }, // Add ratings field
  enrolledStudents: { type: Number, default: 0 }, // Add enrolledStudents field
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model("Course", CourseSchema);
export default Course;