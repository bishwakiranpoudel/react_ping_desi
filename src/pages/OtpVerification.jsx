import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { handlePostRequest } from "../hooks/api";

const OTPVerification = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpMethod, setOtpMethod] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setPhoneNumber(localStorage.getItem("phoneNumber") || "");
    setOtpMethod(localStorage.getItem("otpMethod") || "");
  }, []);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  const retryOtp = async () => {
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
      setCountdown(30);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending OTP", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const formatTime = (seconds) => `00:${seconds < 10 ? "0" : ""}${seconds}`;

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");

    if (/^[0-9]+$/.test(pastedData.join(""))) {
      const newOtp = [...otp];
      pastedData.forEach((value, index) => {
        if (index < 6) newOtp[index] = value;
      });
      setOtp(newOtp);
      inputRefs.current[Math.min(pastedData.length - 1, 5)]?.focus();
    }
  };

  const handleVerify = async () => {
    if (otp.some((digit) => digit === "")) {
      toast.error("Please enter the complete OTP", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      return;
    }

    setIsProcessing(true);
    try {
      const payload = { phoneNumber, otp: otp.join("") };
      const otpResponse = await handlePostRequest(
        "/auth/verify-otp",
        payload,
        {},
        false
      );

      if (otpResponse.token) {
        localStorage.setItem("token", JSON.stringify(otpResponse.token));
        toast.success("OTP Verified. Proceeding to Dashboard.", {
          position: "top-right",
        });
        navigate("/home");
      } else {
        toast.success("OTP Verified. Proceeding to User Registration.", {
          position: "top-right",
        });
        navigate("/username");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4F5] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 w-full max-w-lg">
        <div className="bg-[#FCFCFC] rounded-2xl p-6 sm:p-8">
          <div className="relative">
            <div className="flex items-center mb-6">
              <img src="/logo.png" alt="Logo" className="h-6 w-6" />
            </div>
            <div className="flex justify-center mb-8">
              <img src="/madal.png" alt="Madal Logo" className="h-20" />
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2">
                <svg
                  onClick={goBack}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 cursor-pointer w-5 text-gray-700 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="text-xl font-semibold text-gray-800">
                  Enter the OTP sent to
                </span>
              </div>
              <p onClick={goBack} className="text-sm text-gray-600 ml-7">
                {phoneNumber}{" "}
                <span className="text-[#7B189F] cursor-pointer font-medium">
                  Change
                </span>
              </p>
            </div>

            <div className="mb-6 grid grid-cols-6 gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="rounded-lg w-full h-12 sm:h-14 flex items-center justify-center text-center font-semibold text-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                />
              ))}
            </div>

            {countdown > 0 ? (
              <p className="text-sm text-gray-600 mb-10">
                Didn't receive it? Retry in {formatTime(countdown)}
              </p>
            ) : (
              <button
                onClick={retryOtp}
                className="w-full mb-3 bg-[#7b189fd9] hover:bg-[#7B189F] text-white font-semibold py-3 rounded-md flex items-center justify-center"
              >
                {isProcessing ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  `Retry OTP (${otpMethod})`
                )}
              </button>
            )}

            <button
              onClick={handleVerify}
              disabled={isProcessing || otp.includes("")}
              className={`w-full font-semibold py-3 rounded-md flex items-center justify-center ${
                isProcessing || otp.includes("")
                  ? "bg-purple-400 text-gray-200 cursor-not-allowed"
                  : "bg-[#7b189fd3] hover:bg-[#7B189F] text-white"
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

export default OTPVerification;
