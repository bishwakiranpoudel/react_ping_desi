import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { handlePostRequest } from "../hooks/api";

export default function SigninPage() {
  const navigate = useNavigate();
  const [otpMethod, setOtpMethod] = useState("sms");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSignin = async () => {
    if (!phoneNumber.trim()) {
      toast.error("Please enter a mobile number", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false
      });
      return;
    }

    setIsProcessing(true);
    let formattedPhoneNumber = phoneNumber;
    if (!phoneNumber.startsWith("+977")) {
      formattedPhoneNumber = `+1${phoneNumber}`;
    }

    const payload = { phoneNumber: formattedPhoneNumber, otpMethod };
    try {
      const otpResponse = await handlePostRequest(
        "/auth/request-otp",
        payload,
        {},
        false
      );

      localStorage.setItem("phoneNumber", phoneNumber);
      localStorage.setItem("otpMethod", otpMethod);
      navigate("/otpverification");
    } catch (error) {
      toast.error(
        "" + (error.response?.data?.message ?? error.data?.message ?? error),
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false
        }
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F5F4F5] flex items-center justify-center p-4 font-afacad">
        <div className="bg-white shadow-lg p-4 sm:p-8 w-full max-w-xl rounded-lg">
          <div className="bg-[#FCFCFC] rounded-2xl p-6 sm:p-10">
            <div className="relative">
              <div className="flex flex-col mb-8">
                <div className="flex items-center mb-6">
                  <img
                    src="/logo.png"
                    alt="Decoration"
                    className="h-6 w-6 mr-2"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <img
                    src="/rickshaw.png"
                    alt="Rickshaw Logo"
                    className="h-20 mb-4"
                  />
                  <h1 className="text-2xl font-semibold text-black">
                    Welcome to Desi360
                  </h1>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-black mb-2">
                  MOBILE NUMBER*
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    (+1)
                  </span>
                  <input
                    type="tel"
                    className="flex-1 min-w-0 block w-full px-3 py-3 rounded-none rounded-r-md border border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm"
                    placeholder="Enter mobile number"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-10">
                <label className="block text-sm font-semibold text-black mb-2">
                  SEND OTP VIA*
                </label>
                <div className="flex flex-wrap gap-3">
                  <button
                    className={`flex items-center px-4 py-2 rounded-full text-sm ${
                      otpMethod === "sms"
                        ? "bg-[#f2e8f5] text-purple-600 border border-purple-500"
                        : "bg-gray-100 text-purple-500 border border-transparent hover:border-purple-500"
                    }`}
                    onClick={() => setOtpMethod("sms")}
                  >
                    <img
                      src="/sms.png"
                      alt="SMS Icon"
                      className="h-4 w-4 mr-2"
                    />
                    SMS
                  </button>
                  <button
                    className={`flex items-center px-4 py-2 rounded-full text-sm ${
                      otpMethod === "whatsapp"
                        ? "bg-[#f2e8f5] text-purple-600 border border-purple-500"
                        : "bg-gray-100 text-purple-500 border border-transparent hover:border-purple-500"
                    }`}
                    onClick={() => setOtpMethod("whatsapp")}
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

              <p className="text-xs text-black mt-6 mb-6 text-center">
                By Clicking Continue, I accept the{" "}
                <a href="#" className="text-purple-600 underline">
                  terms of services
                </a>{" "}
                and{" "}
                <a href="#" className="text-purple-600 underline">
                  privacy policy
                </a>
              </p>

              <button
                onClick={handleSignin}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
