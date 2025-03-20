// front-end\src\components\Header.jsx
import { BellIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { logout } from "../services/api"; // Correct import

export default function Header({ user }) {
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-16 w-full fixed top-0 left-0 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-50 shadow-md">
      {/* Logo on the left */}
      <Link to="/home" className="flex items-center">
        <img src="/logo.png" alt="TSEEP Logo" className="h-8" />
      </Link>

      {/* User area on the right */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button className="relative">
          <BellIcon className="w-6 h-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center space-x-2">
          <img
            src="/User-avatar.png"
            alt="User avatar"
            className="w-10 h-10 rounded-full border"
          />
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}