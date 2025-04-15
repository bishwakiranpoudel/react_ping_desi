"use client";

import { useState, useEffect } from "react";

export function ContactForm({ formData, updateFormData }) {
  const [fullName, setFullName] = useState(formData.fullName || "");
  const [state, setState] = useState(formData.state || "");
  const [addressLine1, setAddressLine1] = useState(formData.addressLine1 || "");
  const [addressLine2, setAddressLine2] = useState(formData.addressLine2 || "");
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber || "");

  // Automatically update parent data on change
  const handleSubmit = () => {
    updateFormData({
      fullName,
      state,
      addressLine1,
      addressLine2,
      phoneNumber,
    });
  };

  // Call handleSubmit whenever a field changes
  useEffect(() => {
    handleSubmit();
  }, [fullName, state, addressLine1, addressLine2, phoneNumber]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-medium font-fraunces">
          Add your contact details
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          These details will be visible to potential buyers who are interested
          in your listing.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="addressLine1"
            className="block text-sm font-medium text-gray-700"
          >
            Address Line 1
          </label>
          <input
            id="addressLine1"
            type="text"
            placeholder="Enter your street address"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="addressLine2"
            className="block text-sm font-medium text-gray-700"
          >
            Address Line 2
          </label>
          <input
            id="addressLine2"
            type="text"
            placeholder="Apartment, suite, unit, etc. (optional)"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State
          </label>
          <input
            id="state"
            type="text"
            placeholder="Enter state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
    </div>
  );
}
