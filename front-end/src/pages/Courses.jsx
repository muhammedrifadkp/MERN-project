// front-end\src\pages\Courses.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await API.get("/courses");
        setCourses(response.data);
        setFilteredCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const enrollCourse = async (courseId) => {
    try {
      await API.post("/users/enroll", { courseId });
      alert("Course enrolled successfully!");
    } catch (error) {
      console.error("Error enrolling course:", error);
    }
  };

  const unenrollCourse = async (courseId) => {
    try {
      await API.post("/users/unenroll", { courseId });
      alert("Course unenrolled successfully!");
    } catch (error) {
      console.error("Error unenrolling course:", error);
    }
  };

  // Search filter function
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchTerm, courses]);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8 pt-20">
      {/* Top Header with Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Courses</h1>
        <input
          type="text"
          placeholder="Search Course"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 outline-none w-1/3"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="border-b mb-6">
        <div className="flex space-x-6">
          <Link to="/courses" className="pb-2 border-b-2 border-blue-600 text-blue-600 font-semibold">
            Courses
          </Link>
          <Link to="/cart" className="pb-2 text-gray-500 hover:text-blue-600 transition">
            My Courses
          </Link>
        </div>
      </div>

      {/* Grid Layout for 5 courses in a row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredCourses.map((course) => (
          <div key={course._id} className="bg-white shadow-md rounded-lg overflow-hidden border">
            <img
              src={`http://localhost:5000${course.imageUrl}`}
              alt={course.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">{course.title}</h2>
              <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-full inline-block mt-1">
                Beginner
              </span>

              <p className="text-sm text-gray-500 mt-2">200+ Students Completed</p>

              <div className="flex justify-between items-center mt-3">
                <p className="text-sm text-gray-600 flex items-center">
                  ⏱ <span className="ml-1">2:30hr</span>
                </p>
                <button
                  className="text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700"
                  onClick={() => enrollCourse(course._id)}
                >
                  Add
                </button>
              </div>

              <Link
                to={`/courses/${course._id}`}
                className="block text-blue-500 text-sm font-semibold mt-3 hover:underline"
              >
                Learn More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
