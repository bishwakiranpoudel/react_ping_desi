import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, MessageSquare, FileText, User } from "react-feather"; // Assuming you're using react-feather for icons

const BottomNavbar = ({ isNavbarVisible }) => {
  const location = useLocation();

  // Function to check if the current route matches the link
  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white border-t z-40 transition-transform duration-300 ${
        isNavbarVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-around items-center h-16 px-2">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center ${
            isActive("/") ? "text-purple-600" : "text-gray-500"
          }`}
        >
          <img
            src={"/images/home_icon.svg"}
            alt="Home icon"
            className="w-5 h-5"
          />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/discover"
          className={`flex flex-col items-center justify-center ${
            isActive("/discover") ? "text-purple-600" : "text-gray-500"
          }`}
        >
          <img
            src={"/images/search_icon.svg"}
            alt="Discover icon"
            className="w-5 h-5"
          />
          <span className="text-xs mt-1">Discover</span>
        </Link>
        <Link
          to="/scoops"
          className={`flex flex-col items-center justify-center ${
            isActive("/scoops") ? "text-purple-600" : "text-gray-500"
          }`}
        >
          <img
            src={"/images/scoops_icon.svg"}
            alt="scoops icon"
            className="w-5 h-5"
          />
          <span className="text-xs mt-1">Scoops</span>
        </Link>
        <Link
          to="/classifieds"
          className={`flex flex-col items-center justify-center ${
            isActive("/classifieds") ? "text-purple-600" : "text-gray-500"
          }`}
        >
          <img
            src={"/images/classfields_icon.svg"}
            alt="classfields icon"
            className="w-5 h-5"
          />
          <span className="text-xs mt-1">Classifieds</span>
        </Link>
        <Link
          to="/profile"
          className={`flex flex-col items-center justify-center ${
            isActive("/profile") ? "text-purple-600" : "text-gray-500"
          }`}
        >
          <img
            src={"/images/profile_icon.svg"}
            alt="profile icon"
            className="w-5 h-5"
          />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavbar;
