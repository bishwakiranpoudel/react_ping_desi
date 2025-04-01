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
          <img
            src={"/images/home_icon.svg"}
            alt="Home icon"
            className="w-5 h-5"
          />
          <span className="text-xs mt-1">Home</span>
        </a>
        <a
          href="/discover"
          className="flex flex-col items-center justify-center text-gray-500"
        >
          <img
            src={"/images/search_icon.svg"}
            alt="Discover icon"
            className="w-5 h-5"
          />
          <span className="text-xs mt-1">Discover</span>
        </a>
        <a
          href="/scoops"
          className="flex flex-col items-center justify-center text-gray-500"
        >
          <img
            src={"/images/scoops_icon.svg"}
            alt="scoops icon"
            className="w-5 h-5"
          />
          <span className="text-xs mt-1">Scoops</span>
        </a>
        <a
          href="/classifieds"
          className="flex flex-col items-center justify-center text-gray-500"
        >
          <img
            src={"/images/classfields_icon.svg"}
            alt="classfields icon"
            className="w-5 h-5"
          />
          <span className="text-xs mt-1">Classifieds</span>
        </a>
        <a
          href="/profile"
          className="flex flex-col items-center justify-center text-gray-500"
        >
          <img
            src={"/images/profile_icon.svg"}
            alt="profile icon"
            className="w-5 h-5"
          />
          <span className="text-xs mt-1">Profile</span>
        </a>
      </div>
    </div>
  );
};

export default BottomNavbar;
