import React from "react";
import {
  Home,
  Search,
  MessageSquare,
  FileText,
  User,
  MoreHorizontal,
} from "react-feather"; // Assuming you're using react-feather for icons
import PromotionCardLight from "./PromotionCardLight"; // Import from the correct path
import LocationDisplay from "./Locations"; // Import from the correct path

const MobileSidebar = ({ isMobileSidebarOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full w-[280px] bg-white  flex flex-col font-afacad">
        {/* Sidebar Header */}
        <div className="p-4 border-b">
          <div className="flex items-center">
            <img
              src="/images/ping-desi-logo.png"
              alt="Ping Desi logo"
              width={20}
              height={20}
              className="object-contain mr-2"
            />
            <div className="font-semibold text-[#7B189F]">Ping Desi</div>
          </div>
          <div className="text-sm text-gray-700 pl-7">
            <LocationDisplay />
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 py-4">
          <div className="space-y-1 px-3">
            <a
              href="#"
              className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100"
            >
              <Home className="h-5 w-5 text-gray-500" />
              <span>Home</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100"
            >
              <Search className="h-5 w-5 text-gray-500" />
              <span>Discover</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100"
            >
              <MessageSquare className="h-5 w-5 text-gray-500" />
              <span>Scoops</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100"
            >
              <FileText className="h-5 w-5 text-gray-500" />
              <span>Classifieds</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100"
            >
              <User className="h-5 w-5 text-gray-500" />
              <span>Profile</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100"
            >
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
              <span>More</span>
            </a>
          </div>
        </nav>

        {/* Sidebar Promotion */}
        <PromotionCardLight />
      </div>

      {/* Sidebar Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-10 -z-10"
        onClick={onClose}
      />
    </div>
  );
};

export default MobileSidebar;
