// front-end\src\pages\Cart.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function Cart() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await API.get("/users/enrolled-courses");
        setEnrolledCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  const unenrollCourse = async (courseId) => {
    try {
      await API.post("/users/unenroll", { courseId });
      setEnrolledCourses((prev) =>
        prev.filter((course) => course._id !== courseId)
      );
      alert("Course unenrolled successfully!");
    } catch (error) {
      console.error("Error unenrolling course:", error);
    }
  };

  if (loading) return <p>Loading enrolled courses...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8 pt-20">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Courses</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b mb-6">
        <div className="flex space-x-6">
          <Link to="/courses" className="pb-2 text-gray-500 hover:text-blue-600 transition">
            Courses
          </Link>
          <Link to="/cart" className="pb-2 border-b-2 border-blue-600 text-blue-600 font-semibold">
            My Courses
          </Link>
        </div>
      </div>

      {/* Enrolled Courses Grid */}
      {enrolledCourses.length === 0 ? (
        <p className="text-gray-600">You have not enrolled in any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {enrolledCourses.map((course) => (
            <div key={course._id} className="bg-white shadow-md rounded-lg overflow-hidden border">
              <img
                src={`https://mern-project-production-a976.up.railway.app${course.imageUrl}`}
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
                  <button
                    className="text-white bg-red-600 px-3 py-1 rounded-md hover:bg-red-700"
                    onClick={() => unenrollCourse(course._id)}
                  >
                    Remove
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
      )}
    </div>
  );
};