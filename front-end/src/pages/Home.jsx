// front-end\src\pages\Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import API from "../services/api";

export default function Home() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState([
    { label: "Support", value: "100%" },
    { label: "Users", value: "5k+" },
    { label: "Happy Clients", value: "100%" },
  ]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await API.get("/users/profile");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await API.get("/users/stats");
        setStats([
          { label: "Users", value: response.data.totalUsers },
          { label: "Courses", value: response.data.totalCourses },
          { label: "Reviews", value: response.data.totalReviews },
        ]);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchUserProfile();
    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2">
            <h2 className="text-lg font-medium text-tseep-blue mb-1">
              Hello {user?.username || "User"}
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Start your learning journey today!
            </p>

            <h1 className="text-4xl font-bold mb-1">
              A startup for <span className="text-pink-500">Transforming</span>
            </h1>
            <h1 className="text-5xl font-bold text-tseep-blue mb-6">Careers</h1>

            <p className="text-gray-700 text-sm mb-8 max-w-md">
              Bridging the Gap Between Education and Industry Readiness with Proven Frameworks
            </p>

            <Link
              to="/courses"
              className="inline-flex items-center px-6 py-3 bg-tseep-blue text-white rounded-md hover:bg-opacity-90 transition-colors"
            >
              Join Our Team
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <div className="flex space-x-12 mt-12">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl font-bold text-tseep-blue">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 mt-8 md:mt-0 relative">
            {/* Background circle/blob */}
            <div className="absolute inset-0 bg-tseep-blue rounded-full opacity-20 transform scale-95 translate-x-4"></div>
            
            {/* Small decorative circles */}
            <div className="absolute top-1/4 right-12 w-3 h-3 bg-white rounded-full"></div>
            <div className="absolute top-1/3 left-8 w-3 h-3 bg-white rounded-full"></div>
            <div className="absolute bottom-1/3 right-24 w-4 h-4 bg-white rounded-full"></div>
            
            <div className="relative z-10">
              <img
                src="/woman-with-laptop.png"
                alt="Woman with laptop"
                className="w-[80%] rounded-3xl"
              />
              
              {/* Review badge */}
              <div className="absolute bottom-8 right-12 bg-white rounded-lg py-2 px-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-100 p-1 rounded">
                    <svg className="w-5 h-5 text-tseep-blue" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold text-lg">2K+</span>
                    <div className="text-xs text-gray-600">Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}