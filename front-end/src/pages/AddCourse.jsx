import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    price: "",
    imageUrl: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageUrl: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation: Ensure no empty fields
    for (const key in formData) {
      if (!formData[key]) {
        alert(`${key} is required.`);
        return;
      }
    }
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("instructor", formData.instructor);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("image", formData.imageUrl); // Ensure correct key
  
      await axios.post("http://localhost:5000/api/courses/add", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      alert("Course added successfully!");
      navigate("/courses");
    } catch (error) {
      console.error("Error adding course:", error.response?.data?.message || error.message);
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 mt-10 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Add a New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Title */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Course Title</label>
          <input
            type="text"
            name="title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Description</label>
          <textarea
            name="description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Instructor */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Instructor</label>
          <input
            type="text"
            name="instructor"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={formData.instructor}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Price ($)</label>
          <input
            type="number"
            name="price"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-600">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={handleImageChange}
          />
          {imagePreview && (
  <img src={`http://localhost:5000${imagePreview}`} alt="Course Preview" 
       className="mt-3 w-40 h-40 object-cover rounded-md border" />
)}

        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
