"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "react-toastify";

// Zodiac signs data (names only, content will come from API)
const zodiacSigns = [
  { name: "Aries" },
  { name: "Taurus" },
  { name: "Gemini" },
  { name: "Cancer" },
  { name: "Leo" },
  { name: "Virgo" },
  { name: "Libra" },
  { name: "Scorpio" },
  { name: "Sagittarius" },
  { name: "Capricorn" },
  { name: "Aquarius" },
  { name: "Pisces" },
];

export default function HoroscopeCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("sun");
  const [isChanging, setIsChanging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sunContent, setSunContent] = useState("");
  const [sunWittyContent, setSunWittyContent] = useState("");
  const [moonContent, setMoonContent] = useState("");
  const [moonWittyContent, setMoonWittyContent] = useState("");
  const [error, setError] = useState(null);

  // Get current zodiac sign
  const currentZodiac = zodiacSigns[currentIndex];

  // Fetch horoscope data
  useEffect(() => {
    const fetchHoroscope = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch sun horoscope
        const sunResponse = await fetch(
          `https://services.desi360.co/v1/horoscope/getSunHoroscope?sign=${currentZodiac.name}`
        );

        if (!sunResponse.ok) {
          throw new Error(
            `Failed to fetch sun horoscope: ${sunResponse.statusText}`
          );
        }

        const sunData = await sunResponse.json();

        // Fetch moon horoscope
        const moonResponse = await fetch(
          `https://services.desi360.co/v1/horoscope/getMoonHoroscope?sign=${currentZodiac.name}`
        );

        if (!moonResponse.ok) {
          throw new Error(
            `Failed to fetch moon horoscope: ${moonResponse.statusText}`
          );
        }

        const moonData = await moonResponse.json();

        // Process moon horoscope data
        let generalHoroscope = "";
        try {
          if (moonData.horoscope?.horoscope_message) {
            const parsedMessage = JSON.parse(
              moonData.horoscope.horoscope_message
            );
            generalHoroscope =
              parsedMessage[`${moonData.horoscope.sign} General Horoscope`] ||
              "";
          }
        } catch (parseError) {
          console.error("Error parsing moon horoscope:", parseError);
          generalHoroscope = moonData.horoscope?.horoscope_message || "";
        }

        // Update state with fetched data
        setSunContent(
          sunData.horoscope?.horoscope_message ||
            "Sun horoscope unavailable at the moment."
        );
        setSunWittyContent(
          sunData.horoscope?.witty_message ||
            "No witty insights available right now."
        );
        setMoonContent(
          generalHoroscope || "Moon horoscope unavailable at the moment."
        );
        setMoonWittyContent(
          moonData.horoscope?.witty_message ||
            "No witty insights available right now."
        );
      } catch (error) {
        console.error("Error fetching horoscope:", error);
        setError(error.message);
        toast.error(
          "" +
            (error.response?.data?.message ??
              error.message ??
              "Failed to fetch horoscope"),
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          }
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchHoroscope();
  }, [currentIndex, currentZodiac.name]);

  // Handle tab change (sun or moon)
  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  // Handle zodiac change
  const handleChange = () => {
    if (isChanging || isLoading) return;

    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % zodiacSigns.length);
      setIsChanging(false);
    }, 300);
  };

  return (
    <div className="max-w-md mx-auto font-sans">
      <div className="rounded-xl overflow-hidden shadow-md bg-white">
        {/* Header with tabs */}
        <div className="h-24 relative flex items-end overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <img
              src={
                activeTab === "sun"
                  ? "/zodiac-bg-beige.png"
                  : "/zodiac-bg-blue.png"
              }
              alt="Zodiac background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex w-full">
            {/* Sun Tab */}
            <button
              className={`flex-1 flex items-center justify-center pb-2 relative ${
                activeTab === "sun"
                  ? "text-purple-700 font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabChange("sun")}
            >
              <span className="text-yellow-400 text-lg mr-2">☀️</span>
              <span>Sun Sign</span>
              {activeTab === "sun" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-600"></div>
              )}
            </button>

            {/* Moon Tab */}
            <button
              className={`flex-1 flex items-center justify-center pb-2 relative ${
                activeTab === "moon"
                  ? "text-purple-700 font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabChange("moon")}
            >
              <span className="text-yellow-300 text-lg mr-2">🌙</span>
              <span>Moon Sign</span>
              {activeTab === "moon" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-600"></div>
              )}
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="p-4">
          {/* Zodiac info with icon */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {/* Zodiac icon */}
              <div className="w-12 h-12 rounded-full border-2 border-purple-500 flex items-center justify-center bg-white overflow-hidden">
                <div className="text-2xl">{currentZodiac.name.charAt(0)}</div>
              </div>

              {/* Zodiac name and switch option */}
              <div className="ml-3">
                <div className="flex items-center">
                  <span
                    className={`${
                      activeTab === "sun"
                        ? "text-yellow-500"
                        : "text-yellow-300"
                    } mr-2 text-lg`}
                  >
                    {activeTab === "sun" ? "☀️" : "🌙"}
                  </span>
                  <span className="text-xl font-medium text-gray-800">
                    {currentZodiac.name}
                  </span>
                </div>
                <button
                  className="text-sm text-purple-500 hover:text-purple-700"
                  onClick={() =>
                    handleTabChange(activeTab === "sun" ? "moon" : "sun")
                  }
                >
                  Switch to {activeTab === "sun" ? "Moon" : "Sun"} Sign
                </button>
              </div>
            </div>

            {/* Change button */}
            <button
              className={`flex items-center ${
                isLoading
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-purple-500 hover:text-purple-700"
              }`}
              onClick={handleChange}
              disabled={isChanging || isLoading}
            >
              <span className="mr-1">Change</span>
              <RefreshCw
                className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
              />
            </button>
          </div>

          {/* Horoscope content */}
          <div className="mt-4">
            <div className="flex items-center mb-2">
              <span className="text-lg mr-2">
                {activeTab === "sun" ? "✨" : "🌙"}
              </span>
              <span className="font-medium text-gray-700">
                {activeTab === "sun" ? "Sun Vibes:" : "Moon Vibes:"}
              </span>
            </div>

            {isLoading ? (
              <div className="py-4 text-center text-gray-500">
                Loading horoscope...
              </div>
            ) : error ? (
              <div className="py-4 text-center text-red-500">{error}</div>
            ) : (
              <div
                className={`transition-opacity duration-300 ${
                  isChanging ? "opacity-50" : "opacity-100"
                }`}
              >
                {/* Main horoscope content */}
                <div className="text-gray-700 mb-4">
                  {activeTab === "sun" ? sunContent : moonContent}
                </div>

                {/* Witty content section */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center mb-2">
                    <span className="text-lg mr-2">💫</span>
                    <span className="font-medium text-purple-600">
                      Cosmic Whispers:
                    </span>
                  </div>
                  <div className="text-gray-600 italic">
                    {activeTab === "sun" ? sunWittyContent : moonWittyContent}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
