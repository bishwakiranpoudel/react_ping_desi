import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { handlePostRequest } from "../hooks/api";

const UsernameRegistration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleContinue = async () => {
    if (!firstName.trim()) {
      toast.error("Please enter your first name", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!lastName.trim()) {
      toast.error("Please enter your last name", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!gender) {
      toast.error("Please select your gender", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!email.trim()) {
      toast.error("Please enter an email address", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!isAgeConfirmed) {
      toast.error("Please confirm that you are 18 years or older", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsProcessing(true);
    let phoneNumber = localStorage.getItem("phoneNumber");
    try {
      // Combine firstName and lastName to create a username or send them separately
      const username = `${firstName} ${lastName}`;
      const payload = {
        username,
        firstName,
        lastName,
        gender,
        email,
        phoneNumber,
        avatar_id: 12,
      };

      const registrationResponse = await handlePostRequest(
        "/auth/register",
        payload,
        {},
        false
      );
      toast.success(registrationResponse.message);
      localStorage.setItem("token", JSON.stringify(registrationResponse.token));
      window.location.href = "/home";
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? error.data?.message ?? error,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
        }
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4F5] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-7 w-full max-w-lg">
        <div className="bg-[#FCFCFC] rounded-lg p-4 sm:p-8">
          <div className="relative">
            <div className="flex flex-col mb-6">
              <div className="flex items-center mb-4">
                <img
                  src="/logo.png"
                  alt="Decoration"
                  className="h-6 w-6 mr-2"
                />
              </div>
              <div className="flex justify-start mb-4">
                <img
                  src="/username.png"
                  alt="Username Logo"
                  className="h-20 w-20"
                />
              </div>
            </div>
            <div className="mb-6">
              <span className="text-xl font-semibold text-gray-800">
                Create profile
              </span>
              <p className="text-sm text-gray-600">
                You can always change it later
              </p>
            </div>
            <input
              type="text"
              placeholder="First Name *"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mb-4 block w-full rounded-md border py-3 px-3"
            />
            <input
              type="text"
              placeholder="Last Name *"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mb-4 block w-full rounded-md border py-3 px-3"
            />

            <div className="mb-4">
              <p className="text-sm text-gray-700 mb-2">Gender *</p>
              <div className="flex space-x-6">
                <div className="flex items-center">
                  <input
                    id="gender-male"
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                    className="h-4 w-4 text-[#7B189F] border"
                  />
                  <label
                    htmlFor="gender-male"
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="gender-female"
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                    className="h-4 w-4 text-[#7B189F] border"
                  />
                  <label
                    htmlFor="gender-female"
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    Female
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="gender-other"
                    type="radio"
                    name="gender"
                    value="other"
                    checked={gender === "other"}
                    onChange={() => setGender("other")}
                    className="h-4 w-4 text-[#7B189F] border"
                  />
                  <label
                    htmlFor="gender-other"
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    Other
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={handleContinue}
              disabled={
                isProcessing || !firstName.trim() || !lastName.trim() || !gender
              }
              className={`w-full font-semibold py-3 px-4 rounded-md flex items-center justify-center ${
                isProcessing || !firstName.trim() || !lastName.trim() || !gender
                  ? "bg-purple-400 cursor-not-allowed text-gray-200"
                  : "bg-[#7b189fce] hover:bg-[#7B189F] text-white"
              }`}
            >
              {isProcessing ? (
                <FaSpinner className="animate-spin" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsernameRegistration;
