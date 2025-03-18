import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCart, setFilteredCart] = useState(cart);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  // Function to remove a course from cart
  const removeFromCart = (courseId) => {
    const updatedCart = cart.filter((course) => course._id !== courseId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Search filter function
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCart(cart);
    } else {
      const filtered = cart.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCart(filtered);
    }
  }, [searchTerm, cart]);

  return (
    <div className="p-8 pt-20">
      {/* Top Header with Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">My Courses</h1>
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
          <Link to="/courses" className="pb-2 text-gray-500 hover:text-blue-600 transition">
            Courses
          </Link>
          <Link to="/cart" className="pb-2 border-b-2 border-blue-600 text-blue-600 font-semibold">
            My Courses
          </Link>
        </div>
      </div>

      {/* Browse More Courses Button */}
      {/* <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/courses")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Browse More Courses
        </button>
      </div> */}

      {/* Course Grid */}
      {filteredCart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredCart.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border"
            >
              <img
                src={`http://localhost:5000${course.imageUrl}`}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2">{course.title}</h3>
                {/* <p className="text-sm text-gray-600 mb-4">{course.description}</p> */}
                <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-full inline-block mt-1">
                Beginner
              </span>

              <p className="text-sm text-gray-500 mt-2">200+ Students Completed</p>

                <div className="flex justify-between items-center">
                  <Link
                    to={`/courses/${course._id}`}
                    className="text-blue-500 hover:underline text-sm font-medium"
                  >
                    View More →
                  </Link>
                  <button
                    onClick={() => removeFromCart(course._id)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-opacity-90 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
