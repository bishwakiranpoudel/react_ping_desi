"use client";

import { Pencil, ChevronDown } from "lucide-react";

function UserProfile({
  formData,
  isEditing,
  handleAvatarClick,
  handleInputChange,
  handleDiscard,
  handleSave,
  setIsEditing,
  setDebugCounter,
}) {
  return (
    <div className="space-y-4">
      {/* Profile Header */}
      <div className="rounded-lg border border-gray-100 bg-white p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div
              className="relative w-16 h-16 rounded-full overflow-hidden cursor-pointer bg-pink-100"
              onClick={handleAvatarClick}
            >
              <img
                src={formData.profileImage || formData.avatarurl || "/placeholder.svg"}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <h2 className="text-xl font-bold">{formData.name}</h2>
              <p className="text-gray-500 text-sm">
                Lives in {formData.location}
              </p>
              <div className="flex items-center mt-1">
                <div className="w-1 h-4 bg-[#7B189F] mr-2" />
                <span className="text-sm">@{formData.username}</span>
              </div>
            </div>
          </div>

          {!isEditing ? (
            <button
              className="bg-[#7B189F] hover:bg-[#6A1587] text-white rounded-full px-4 py-2 flex items-center gap-1"
              onClick={() => {
                setIsEditing(true);
                setDebugCounter((prev) => prev + 1);
              }}
            >
              <Pencil size={16} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                className="bg-white border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50"
                onClick={handleDiscard}
              >
                Discard
              </button>
              <button
                className="bg-[#7B189F] hover:bg-[#6A1587] text-white rounded-full px-4 py-2"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Basic Information */}
      <div className="rounded-lg border border-gray-100 bg-white p-6">
        <h3 className="text-xl font-bold mb-6">Basic Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              UserName
            </label>
            {isEditing ? (
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7B189F]"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            ) : (
              <div className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50">
                {formData.username}
              </div>
            )}
          </div>

          {/* <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Flat Number
            </label>
            {isEditing ? (
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7B189F]"
                name="flatNumber"
                value={formData.flatNumber}
                onChange={handleInputChange}
              />
            ) : (
              <div className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50">
                {formData.flatNumber}
              </div>
            )}
          </div> */}

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              First Name
            </label>
            {isEditing ? (
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7B189F]"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
              />
            ) : (
              <div className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50">
                {formData.firstname}
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Last Name
            </label>
            {isEditing ? (
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7B189F]"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
              />
            ) : (
              <div className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50">
                {formData.lastname}
              </div>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Phone Number
            </label>
            {isEditing ? (
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7B189F]"
                name="mobileno"
                value={formData.mobileno}
                onChange={handleInputChange}
              />
            ) : (
              <div className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50">
                {formData.mobileno}
              </div>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Gender
            </label>
            {isEditing ? (
              <div className="relative">
                <select
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7B189F] appearance-none"
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
              </div>
            ) : (
              <div className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50">
                {formData.gender || "Not specified"}
              </div>
            )}
          </div>

          {/*

{/*
          <div>

            <label className="block text-gray-700 text-sm font-medium mb-2">
              {isEditing ? "Phone" : "Address"}
            </label>
            {isEditing ? (
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7B189F]"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            ) : (
              <div className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50">
                {formData.phone}
              </div>
            )}
          </div> 
            *****}


          {isEditing && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Location
              </label>
              <div className="relative">
                <select
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7B189F] appearance-none"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                >
                  <option value="Austin">Austin</option>
                  <option value="New York">New York</option>
                  <option value="San Francisco">San Francisco</option>
                  <option value="Chicago">Chicago</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
              </div>
            </div>
          )}

          {!isEditing && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Location
              </label>
              <div className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 flex justify-between items-center">
                <span>{formData.location}</span>
                <ChevronDown className="text-gray-500" size={18} />
              </div>
            </div>
          )}
          */}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
