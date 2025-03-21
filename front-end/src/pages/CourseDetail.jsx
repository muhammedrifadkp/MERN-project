// front-end\src\pages\CourseDetail.jsx
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`https://mern-project-production-a976.up.railway.app/api/courses/${id}`);
        if (!response.ok) throw new Error("Failed to fetch course details");

        const data = await response.json();
        setCourse(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p>Loading course details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 pt-20">
      <Link to="/courses" className="text-blue-500 hover:underline text-sm">← Back</Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        {/* Left Section - Course Details */}
        <div className="md:col-span-2">
          {/* Course Title and Subtitle */}
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-gray-600 text-sm mt-1">A Two-Part Beginner Course</p>

          {/* Badges */}
          <div className="flex items-center space-x-2 mt-2">
            <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
              🏆 200+ Students Completed
            </span>
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
              By {course.instructor}
            </span>
          </div>

          {/* Course Image */}
          <img 
            src={`https://mern-project-production-a976.up.railway.app${course.imageUrl}`} 
            alt={course.title} 
            className="w-full h-64 object-cover rounded-lg mt-4"
          />

          {/* Course Overview Section */}
          <div className="mt-6 p-4 border rounded-lg">
            <h2 className="text-lg font-semibold">Course Overview</h2>
            <p className="text-gray-700 text-sm mt-2">{course.description}</p>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm">
                <p>📘 <strong>4 Modules</strong> (From Basics)</p>
                <p>⭐ <strong>{course.ratings}</strong> (1,448 reviews)</p>
              </div>
              <div className="text-sm">
                <p>🎓 <strong>{course.enrolledStudents}</strong> Students Enrolled</p>
                <p>⏳ <strong>6 Months</strong> (~256 Hours)</p>
              </div>
            </div>
          </div>

          {/* Course Modules */}
          <div className="mt-6 p-4 border rounded-lg">
            <h2 className="text-lg font-semibold">Course Modules</h2>
            <ul className="list-disc list-inside mt-2">
              {course.modules?.map((module, index) => (
                <li key={index} className="text-gray-700 text-sm">
                  {module}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section - Sidebar */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Course available in</h3>
          <p className="text-blue-500 font-semibold text-xl">25+ Institutes</p>

          {/* Search Input */}
          <div className="mt-3">
            <input
              type="text"
              placeholder="Find institutes"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* State and District Filters */}
          <div className="mt-3">
            <select className="w-full px-3 py-2 border rounded-md">
              <option>Select State</option>
            </select>
          </div>

          <div className="mt-3">
            <select className="w-full px-3 py-2 border rounded-md">
              <option>Select District</option>
            </select>
          </div>

          {/* Find Now Button */}
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Find Now
          </button>
        </div>
      </div>
    </div>
  );
}