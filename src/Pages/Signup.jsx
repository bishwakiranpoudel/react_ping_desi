import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import {  toast } from "react-toastify";
import { handlePostRequest } from "../hooks/api";

const UserSignup = () => {
  const navigate = useNavigate();

  // States for form
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpMethod, setOtpMethod] = useState("sms");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSignup = async () => {
    // Validate phone number
    if (!phoneNumber.trim()) {
      toast.error("Please enter a mobile number", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      return;
    }

    setIsProcessing(true);
    const payload = { phoneNumber, otpMethod };
    try {
      const otpResponse = await handlePostRequest(
        "/auth/request-otp",
        payload,
        {},
        false
      );
      alert(otpResponse.otp);
      localStorage.setItem("phoneNumber", phoneNumber);
      localStorage.setItem("otpMethod", otpMethod);
      navigate("/otpverification");
    } catch (error) {
      toast.error(
        "" + (error.response?.data?.message ?? error.data?.message ?? error),
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        }
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Side (Signup Form) */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-4 sm:p-8">
          <div className="w-full max-w-md">
            <div className="flex items-center mb-6">
              <img
                src="/logo.png"
                alt="Desi360 Logo"
                className="h-6 w-6 mr-3"
              />
              <h1 className="text-2xl font-semibold text-gray-800">
                Welcome to Desi360
              </h1>
            </div>

            <div className="mb-6">
              <label
                className="block text-xs font-bold text-gray-800 mb-2"
                htmlFor="mobile"
              >
                MOBILE NUMBER*
              </label>
              <div className="flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  (555)
                </span>
                <input
                  type="tel"
                  id="mobile"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="rounded-none rounded-r-md border border-gray-300 text-gray-900 focus:ring-purple-500 focus:border-purple-500 block flex-1 min-w-0 w-full text-sm p-2.5"
                  placeholder="Enter mobile number"
                />
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-xs font-bold text-gray-800 mb-2">
                SEND OTP VIA*
              </label>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setOtpMethod("sms")}
                  className={`flex items-center justify-center px-4 py-2 rounded-full text-sm ${
                    otpMethod === "sms"
                      ? "bg-[#F2E8F5] text-purple-600 border border-purple-500"
                      : "text-purple-500 border border-[#F2E8F5] hover:bg-[#F2E8F5]"
                  }`}
                >
                  <img src="/sms.png" alt="SMS Icon" className="h-4 w-4 mr-2" />
                  SMS
                </button>
                <button
                  onClick={() => setOtpMethod("whatsapp")}
                  className={`flex items-center justify-center px-4 py-2 rounded-full text-sm ${
                    otpMethod === "whatsapp"
                      ? "bg-[#F2E8F5] text-purple-600 border border-purple-500"
                      : "text-purple-500 border border-[#F2E8F5] hover:bg-[#F2E8F5]"
                  }`}
                >
                  <img
                    src="/whatsapp.png"
                    alt="WhatsApp Icon"
                    className="h-4 w-4 mr-2"
                  />
                  WhatsApp
                </button>
              </div>
            </div>

            <button
              onClick={handleSignup}
              disabled={isProcessing || phoneNumber.length < 1}
              className={`w-full font-semibold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline flex items-center justify-center
                ${
                  isProcessing || phoneNumber.length < 1
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

            <p className="text-xs text-gray-800 mt-6 text-center">
              By Clicking Continue, I accept the{" "}
              <a href="#" className="text-purple-600 underline">
                terms of service
              </a>{" "}
              and{" "}
              <a href="#" className="text-purple-600 underline">
                privacy policy
              </a>
            </p>
          </div>
        </div>

        {/* Right Side (Image) - Hidden on mobile */}
        <div className="hidden md:block md:w-1/2 h-full">
          <img
            src="/image/signupcover.png"
            alt="Mahal photo"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default UserSignup;

