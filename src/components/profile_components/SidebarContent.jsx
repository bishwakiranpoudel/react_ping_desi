"use client";

import { User, List, Calendar, LogOut } from "lucide-react";

const SidebarContent = ({ handleTabChange, activeTab, setSidebarOpen }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/home";
  };
  return (
    <div className="flex flex-col rounded-lg border border-gray-100 overflow-hidden">
      <div
        className={`p-4 border-b border-gray-100 cursor-pointer ${
          activeTab === "profile" ? "bg-[#F9F0FF]" : "hover:bg-gray-50"
        }`}
        onClick={() => {
          handleTabChange("profile");
          setSidebarOpen(false);
        }}
      >
        <div className="flex items-center gap-3">
          <User
            size={20}
            className={`${
              activeTab === "profile" ? "text-[#7B189F]" : "text-gray-400"
            }`}
          />
          <div>
            <div
              className={`font-medium ${
                activeTab === "profile" ? "text-[#7B189F]" : ""
              }`}
            >
              User Profile
            </div>
            <div className="text-sm text-gray-500">
              Your Personal Informations
            </div>
          </div>
        </div>
      </div>

      <div
        className={`p-4 border-b border-gray-100 cursor-pointer ${
          activeTab === "classifieds" ? "bg-[#F9F0FF]" : "hover:bg-gray-50"
        }`}
        onClick={() => {
          handleTabChange("classifieds");
          setSidebarOpen(false);
        }}
      >
        <div className="flex items-center gap-3">
          <List
            size={20}
            className={`${
              activeTab === "classifieds" ? "text-[#7B189F]" : "text-gray-400"
            }`}
          />
          <div>
            <div
              className={`font-medium ${
                activeTab === "classifieds" ? "text-[#7B189F]" : ""
              }`}
            >
              Manage Your Classifieds
            </div>
            <div className="text-sm text-gray-500">Details about Listings</div>
          </div>
        </div>
      </div>

      <div
        className={`p-4 border-b border-gray-100 cursor-pointer ${
          activeTab === "events" ? "bg-[#F9F0FF]" : "hover:bg-gray-50"
        }`}
        onClick={() => {
          handleTabChange("events");
          setSidebarOpen(false);
        }}
      >
        <div className="flex items-center gap-3">
          <Calendar
            size={20}
            className={`${
              activeTab === "events" ? "text-[#7B189F]" : "text-gray-400"
            }`}
          />
          <div>
            <div
              className={`font-medium ${
                activeTab === "events" ? "text-[#7B189F]" : ""
              }`}
            >
              Manage your Events
            </div>
            <div className="text-sm text-gray-500">
              Details about Events Created
            </div>
          </div>
        </div>
      </div>

      <div
        className="p-4 cursor-pointer hover:bg-gray-50 group"
        onClick={handleLogout}
      >
        <div className="flex items-center gap-3">
          <LogOut
            size={20}
            className="text-gray-400 group-hover:text-red-500"
          />
          <div className="font-medium group-hover:text-red-500">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
