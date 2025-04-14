import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { handlePostRequest } from "../hooks/api";

const UsernameRegistration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleContinue = async () => {
    if (!username.trim()) {
      toast.error("Please enter a username", {
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
      const payload = { username, email, phoneNumber, avatar_id: 12 };
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
                Create username
              </span>
              <p className="text-sm text-gray-600">
                You can always change it later
              </p>
            </div>
            <input
              type="text"
              placeholder="Username *"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-4 block w-full rounded-md border py-3 px-3"
            />
            <input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-6 block w-full rounded-md border py-3 px-3"
            />
            <div className="mb-8 flex items-start">
              <input
                id="age-confirm"
                type="checkbox"
                checked={isAgeConfirmed}
                onChange={(e) => setIsAgeConfirmed(e.target.checked)}
                className="h-4 w-4 text-purple-600 border rounded"
              />
              <label
                htmlFor="age-confirm"
                className="ml-3 text-sm font-medium text-gray-700"
              >
                I confirm that I am 18 years of age or older.
              </label>
            </div>
            <button
              onClick={handleContinue}
              disabled={
                isProcessing ||
                !username.trim() ||
                !email.trim() ||
                !isAgeConfirmed
              }
              className={`w-full font-semibold py-3 px-4 rounded-md flex items-center justify-center ${
                isProcessing ||
                !username.trim() ||
                !email.trim() ||
                !isAgeConfirmed
                  ? "bg-purple-400 cursor-not-allowed text-gray-200"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
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
