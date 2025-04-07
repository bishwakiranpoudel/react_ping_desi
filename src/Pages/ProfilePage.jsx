// ProfilePage.jsx
"use client";

import { useState, useEffect } from "react";
import {
  User,
  Home,
  Calendar,
  LogOut,
  Pencil,
  Menu,
  X,
  Trash2,
} from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import MainLayout from "../components/MainLayout";
import UserProfile from "../components/profile_components/UserProfile";
import ManageEvents from "../components/profile_components/ManageEvents";
import ManageClassifieds from "../components/profile_components/ManageClassifieds";
import ImagePickerDialog from "../components/profile_components/ImagePickerDialog";
import SidebarContent from "../components/profile_components/SidebarContent";

// Mock data
const userData = {
  name: "Aarav Patel",
  username: "@Aaravpatel123",
  location: "Austin",
  email: "aaravpatelemail@gmail.com",
  phone: "+1 01234 1241",
  address: "The Test street, Test road",
  flatNumber: "Flat 1234",
  city: "Austin",
  profileImage: "/images/gemini.png", // Correct path to the image
};

const events = [
  {
    id: 1,
    title: "Our Gender Reveal Party",
    date: "13th Nov, 11:00 AM",
  },
];

const classifieds = [
  {
    id: 1,
    type: "House",
    title: "2563 W. Gray st.utica, Pennsylvania 5...",
    details: {
      beds: 3,
      baths: 7,
    },
    price: 249500,
    condition: "Used",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    type: "Appliance",
    title: "Play Station 5",
    price: 420,
    condition: "New",
    image: "/placeholder.svg",
  },
];

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const [imagePickerOpen, setImagePickerOpen] = useState(false);

  // Debug counter to force re-renders
  const [debugCounter, setDebugCounter] = useState(0);

  useEffect(() => {}, [isEditing, debugCounter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    setDebugCounter((prev) => prev + 1);
  };

  const handleDiscard = () => {
    setFormData({ ...userData });
    setIsEditing(false);
    setDebugCounter((prev) => prev + 1);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setDebugCounter((prev) => prev + 1);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleAvatarClick = () => {
    if (isEditing) {
      setImagePickerOpen(true);
    }
  };

  const closeImagePicker = () => {
    setImagePickerOpen(false);
  };

  const handleImageSelected = (newImage) => {
    setFormData((prev) => ({ ...prev, profileImage: newImage }));
    closeImagePicker();
  };

  return (
    <MainLayout rs={false}>
      <div className="min-h-screen flex font-afacad">
        {/* Mobile Header */}
        {isMobile && (
          <div className="flex justify-between items-center p-2 border-b border-gray-300 w-full fixed top-0 bg-white z-10">
            <button
              className="bg-none border-none cursor-pointer"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="m-0 text-lg">
              {activeTab === "profile"
                ? "Profile"
                : activeTab === "classifieds"
                ? "Classifieds"
                : "Events"}
            </h1>
            <div className="w-6"></div> {/* Spacer */}
          </div>
        )}

        {/* Mobile Sidebar */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 z-50 flex"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="w-4/5 max-w-sm bg-white h-full p-4 box-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="m-0 text-xl">Menu</h2>
                <button
                  className="bg-none border-none cursor-pointer"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <SidebarContent
                handleTabChange={handleTabChange}
                activeTab={activeTab}
                setSidebarOpen={setSidebarOpen}
              />
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className="w-64 p-4 bg-white border-r border-gray-300">
            <SidebarContent
              handleTabChange={handleTabChange}
              activeTab={activeTab}
              setSidebarOpen={setSidebarOpen}
            />
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 mt-0">
          {activeTab === "profile" && (
            <UserProfile
              formData={formData}
              isEditing={isEditing}
              handleAvatarClick={handleAvatarClick}
              handleInputChange={handleInputChange}
              handleDiscard={handleDiscard}
              handleSave={handleSave}
              setIsEditing={setIsEditing}
              setDebugCounter={setDebugCounter}
            />
          )}
          {activeTab === "events" && <ManageEvents events={events} />}
          {activeTab === "classifieds" && (
            <ManageClassifieds classifieds={classifieds} />
          )}
        </div>
      </div>
      {imagePickerOpen && (
        <ImagePickerDialog
          onClose={closeImagePicker}
          onImageSelected={handleImageSelected}
        />
      )}
    </MainLayout>
  );
}

export default ProfilePage;
