// ProfilePage.jsx
"use client";

import { useState, useEffect } from "react";
import {
  X,
} from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import MainLayout from "../components/MainLayout";
import UserProfile from "../components/profile_components/UserProfile";
import ManageEvents from "../components/profile_components/ManageEvents";
import ManageClassifieds from "../components/profile_components/ManageClassifieds";
import ImagePickerDialog from "../components/profile_components/ImagePickerDialog";
import SidebarContent from "../components/profile_components/SidebarContent";
import { toast } from "react-toastify";
import { GetProfile } from "../services/profile";
import { queryListings } from "../services/classified";
import { jwtDecode } from "jwt-decode";
import { getPersonalEvents } from "../services/events";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [classifiedData, setClassifiedData] = useState(null);
  const [eventsData, setEventsData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const [imagePickerOpen, setImagePickerOpen] = useState(false);

  // Debug counter to force re-renders
  const [debugCounter, setDebugCounter] = useState(0);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const profile = await GetProfile();
        console.log('profile',profile)
        setFormData(profile.data);
        setUserData(profile.data);
      } catch (error) {
        toast.error("Error while fetching profile");
      }
    }
    fetchProfile();
  }, []);

  // Fetching listings based on user
  useEffect(() => {
    async function fetchListings() {
      try {
        const token = localStorage.getItem("token");
        const parsedAccess = JSON.parse(token);
        const decoded = jwtDecode(parsedAccess.access);
        const user_id = decoded.userid;
        const payload = { user_id: user_id };
        const listings = await queryListings(payload);
        setClassifiedData(listings.data);
      } catch (error) {
        console.error("error while fetching listisngs", error);
        toast.error("Error while fetching your listings");
      }
    }
    fetchListings();
  }, []);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const eventsResponse = await getPersonalEvents();
        setEventsData(eventsResponse.message);
      } catch (error) {
        toast.error("Error while fetching personal events");
      }
    }
    fetchEvents();
  }, []);

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
    <MainLayout rs={false} onMenuClick={() => setSidebarOpen(true)} menu={true}>
      <div className="min-h-screen flex font-afacad">
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
          {activeTab === "profile" && formData && (
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
          {activeTab === "events" && eventsData && (
            <ManageEvents events={eventsData} />
          )}
          {activeTab === "classifieds" && classifiedData && (
            <ManageClassifieds classifieds={classifiedData} />
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
