import React from "react";
import { Home, Search, MessageSquare, FileText, User } from "react-feather"; // Assuming you're using react-feather for icons

const BottomNavbar = ({ isNavbarVisible }) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white border-t z-40 transition-transform duration-300 ${
        isNavbarVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-around items-center h-16 px-2">
        <a
          href="/"
          className="flex flex-col items-center justify-center text-purple-600"
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </a>
        <a
          href="/discover"
          className="flex flex-col items-center justify-center text-gray-500"
        >
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">Discover</span>
        </a>
        <a
          href="/scoops"
          className="flex flex-col items-center justify-center text-gray-500"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="text-xs mt-1">Scoops</span>
        </a>
        <a
          href="/classifieds"
          className="flex flex-col items-center justify-center text-gray-500"
        >
          <FileText className="h-5 w-5" />
          <span className="text-xs mt-1">Classifieds</span>
        </a>
        <a
          href="/profile"
          className="flex flex-col items-center justify-center text-gray-500"
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </a>
      </div>
    </div>
  );
};

export default BottomNavbar;
