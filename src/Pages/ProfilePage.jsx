"use client";

import { useState, useEffect } from "react";
import { User, Home, Calendar, LogOut, Pencil, Menu, X } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import MainLayout from "../components/MainLayout";
import { GetProfile } from "../services/user";
import { toast } from "react-toastify";

const events = [
  {
    id: 1,
    title: "Our Gender Reveal Party",
    date: "13th Nov, 11:00 AM"
  }
];

const classifieds = [
  {
    id: 1,
    type: "House",
    title: "2563 W. Gray st.utica, Pennsylvania 5...",
    details: {
      beds: 3,
      baths: 7
    },
    price: 249500,
    condition: "Used",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    type: "Appliance",
    title: "Play Station 5",
    price: 420,
    condition: "New",
    image: "/placeholder.svg"
  }
];

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const [userData, setUserData] = useState(null);

  const [formData, setFormData] = useState(null);
  useEffect(() => {
    async function fetchProfileDetails() {
      try {
        const profile = await GetProfile();
        console.log("profile", profile);
        setUserData(profile.data);
        setFormData(profile.data);
      } catch (error) {
        toast.error("Error: While fetching profile");
      }
    }

    fetchProfileDetails();
  }, []);

  // Debug counter to force re-renders
  const [debugCounter, setDebugCounter] = useState(0);

  useEffect(
    () => {
      console.log(
        "ProfilePage rendered, isEditing:",
        isEditing,
        "debugCounter:",
        debugCounter
      );
    },
    [isEditing, debugCounter]
  );

  const handleInputChange = e => {
    const { name, value } = e.target;
    console.log("Input changed:", name, value);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Save clicked");
    setIsEditing(false);
    setDebugCounter(prev => prev + 1);
  };

  const handleDiscard = () => {
    console.log("Discard clicked");
    setFormData({ ...userData });
    setIsEditing(false);
    setDebugCounter(prev => prev + 1);
  };

  const handleEditClick = () => {
    console.log("Edit button clicked");
    setIsEditing(true);
    setDebugCounter(prev => prev + 1);
  };

  const handleTabChange = tab => {
    setActiveTab(tab);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Sidebar content
  const SidebarContent = () => (
    <>
      <div
        className={`flex items-center p-2 m-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${
          activeTab === "profile" ? "bg-purple-100" : ""
        }`}
        onClick={() => handleTabChange("profile")}
      >
        <User size={20} className="text-purple-600 mr-2" />
        <div>User Profile</div>
      </div>

      <div
        className={`flex items-center p-2 m-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${
          activeTab === "classifieds" ? "bg-purple-100" : ""
        }`}
        onClick={() => handleTabChange("classifieds")}
      >
        <Home size={20} className="text-purple-600 mr-2" />
        <div>Manage Your Listings</div>
      </div>

      <div
        className={`flex items-center p-2 m-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100 ${
          activeTab === "events" ? "bg-purple-100" : ""
        }`}
        onClick={() => handleTabChange("events")}
      >
        <Calendar size={20} className="text-purple-600 mr-2" />
        <div>Manage your Events</div>
      </div>

      <div
        className="flex items-center p-2 m-1 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
        onClick={() => console.log("Logout clicked")}
      >
        <LogOut size={20} />
        <div>Logout</div>
      </div>
    </>
  );

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
                : activeTab === "classifieds" ? "Classifieds" : "Events"}
            </h1>
            <div className="w-6" /> {/* Spacer */}
          </div>
        )}

        {/* Mobile Sidebar */}
        {isMobile &&
          sidebarOpen && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 z-50 flex"
              onClick={() => setSidebarOpen(false)}
            >
              <div
                className="w-4/5 max-w-sm bg-white h-full p-4 box-border"
                onClick={e => e.stopPropagation()}
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
                <SidebarContent />
              </div>
            </div>
          )}

        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className="w-64 p-4 bg-white border-r border-gray-300">
            <SidebarContent />
          </div>
        )}

        {/* Main Content */}
        {userData &&
          formData && (
            <div className="flex-1 p-4 mt-0">
              {activeTab === "profile" && (
                <>
                  <div className="border border-gray-300 rounded p-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h2 className="m-0 mb-1 text-2xl">
                          {userData.username}
                        </h2>
                        <p className="m-0 text-gray-600">
                          Lives in {userData.location}
                        </p>
                        <div className="flex items-center mt-1">
                          <div className="w-1 h-4 bg-purple-600 mr-2" />
                          <span>{userData.username}</span>
                        </div>
                      </div>

                      {/* EDIT PROFILE BUTTON - DIRECT INLINE HANDLER */}
                      {!isEditing ? (
                        <button
                          className="bg-purple-600 text-white border-none rounded p-2 text-base cursor-pointer flex items-center gap-2"
                          onClick={() => {
                            console.log("Edit button clicked directly");
                            setIsEditing(true);
                            setDebugCounter(prev => prev + 1);
                          }}
                        >
                          <Pencil size={16} />
                          Edit Profile
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            className="bg-white border border-gray-300 rounded p-2 cursor-pointer"
                            onClick={handleDiscard}
                          >
                            Discard
                          </button>
                          <button
                            className="bg-purple-600 text-white border-none rounded p-2 cursor-pointer"
                            onClick={handleSave}
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border border-gray-300 rounded p-4">
                    <h3 className="mt-0 text-xl">Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Name
                        </label>
                        {isEditing ? (
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="name"
                            value={formData.username}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <div className="border border-gray-300 rounded p-2">
                            {formData.username}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Flat Number
                        </label>
                        {isEditing ? (
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="flatNumber"
                            value={formData.flatNumber}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <div className="border border-gray-300 rounded p-2">
                            {formData.flatNumber}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Email
                        </label>
                        {isEditing ? (
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="email"
                            value={formData.userloginname}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <div className="border border-gray-300 rounded p-2">
                            {formData.userloginname}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Phone
                        </label>
                        {isEditing ? (
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="phone"
                            value={formData.mobileno}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <div className="border border-gray-300 rounded p-2">
                            {formData.mobileno}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
              {activeTab === "events" && (
                <div className="border border-gray-300 rounded p-4">
                  <h2 className="text-xl mb-4">Manage Your Events</h2>
                  {events.map(event => (
                    <div
                      key={event.id}
                      className="mb-4 p-4 border border-gray-200 rounded shadow-sm flex items-center justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <p className="text-gray-600">{event.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          View
                        </button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "classifieds" && (
                <div className="border border-gray-300 rounded p-4">
                  <h2 className="text-xl mb-4">Manage Your Listings</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {classifieds.map(item => (
                      <div
                        key={item.id}
                        className="border border-gray-200 rounded shadow-md overflow-hidden"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-semibold">
                            {item.title}
                          </h3>
                          <p className="text-gray-600">Type: {item.type}</p>
                          <p className="text-gray-600">
                            Condition: {item.condition}
                          </p>
                          <p className="text-xl font-bold text-green-600">
                            ${item.price}
                          </p>
                          <div className="flex justify-end mt-4">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              Edit
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    </MainLayout>
  );
}

export default ProfilePage;
