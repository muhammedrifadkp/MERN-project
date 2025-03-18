import { BellIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Header({ user }) {
  return (
    <div className="h-16 w-full fixed top-0 left-0 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-50 shadow-md">
      {/* Logo on the left */}
      <Link to="/home" className="flex items-center">
        <img src="/logo.png" alt="TSEEP Logo" className="h-8" />
      </Link>

      {/* Search bar */}
      {/* <div className="flex-1 mx-6">
        <input
          type="text"
          placeholder="Search Course"
          className="w-full max-w-lg px-4 py-2 border rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}

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
          <button className="text-gray-700 hover:text-gray-900 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
