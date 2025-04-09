"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { fetchHoroscope } from "../../services/horosocope";
import { toast } from "react-toastify";

// Zodiac signs data
const zodiacSigns = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

export default function HoroscopeCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("sun");
  const [isChanging, setIsChanging] = useState(false);
  const [horoscopeData, setHoroscopeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isContentLoading, setIsContentLoading] = useState(false);

  // Get current zodiac sign
  const currentZodiac = zodiacSigns[currentIndex];

  // Handle tab change (sun or moon)
  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
      setIsContentLoading(true); // Only load the content area
    }
  };

  // Getting Horoscope Data
  useEffect(() => {
    async function fetchHoroscopes() {
      try {
        // If it's the initial load, we'll show the full skeleton
        // If it's a tab switch, we'll only show the content skeleton
        if (isLoading) {
          setIsLoading(true);
        } else {
          setIsContentLoading(true);
        }

        const payload = {
          mode: activeTab,
          sign: zodiacSigns[currentIndex],
        };
        const horoscopeResponse = await fetchHoroscope(payload);
        setHoroscopeData(horoscopeResponse.horoscope);
      } catch (error) {
        toast.error("Error while fetching the horoscope");
      } finally {
        setIsLoading(false);
        setIsContentLoading(false);
      }
    }
    fetchHoroscopes();
  }, [activeTab, currentIndex, isLoading]);

  // Handle zodiac change
  const handleChange = () => {
    if (isChanging) return;
    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % zodiacSigns.length);
      setIsChanging(false);
    }, 300);
  };

  // Skeleton loader component
  const HoroscopeCardSkeleton = () => (
    <div className="max-w-md mx-auto font-afacad">
      <div className="rounded-xl overflow-hidden shadow-md bg-white">
        {/* Header with tabs skeleton */}
        <div className="h-24 relative flex items-end overflow-hidden bg-gray-200">
          <div className="flex w-full h-full">
            {/* Sun Tab Skeleton */}
            <div className="flex-1 flex items-center justify-center pb-2 relative">
              <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
            </div>

            {/* Moon Tab Skeleton */}
            <div className="flex-1 flex items-center justify-center pb-2 relative">
              <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Content area skeleton */}
        <div className="p-4">
          {/* Zodiac info with icon skeleton */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              {/* Zodiac icon skeleton */}
              <div className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-200 animate-pulse"></div>

              {/* Zodiac name and switch option skeleton */}
              <div className="ml-3">
                <div className="h-6 w-24 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Change button skeleton */}
            <div className="h-8 w-20 bg-gray-300 rounded animate-pulse"></div>
          </div>

          {/* Horoscope content skeleton */}
          <div className="mt-4">
            <div className="flex items-center mb-2">
              <div className="h-6 w-6 bg-gray-300 rounded animate-pulse mr-2"></div>
              <div className="h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
            </div>

            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Add a content-only skeleton loader component
  const ContentSkeleton = () => (
    <div className="mt-4">
      <div className="flex items-center mb-2">
        <span className="text-lg mr-2">
          {activeTab === "sun" ? "✨" : "🌙"}
        </span>
        <span className="font-medium text-gray-700">
          {activeTab === "sun" ? "Sun Vibes:" : "Moon Vibes:"}
        </span>
      </div>

      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  );

  if (isLoading) {
    return <HoroscopeCardSkeleton />;
  }

  return (
    <div className="max-w-md mx-auto font-afacad">
      <div className="rounded-xl overflow-hidden shadow-md bg-white">
        {/* Header with tabs */}
        <div className="h-24 relative flex items-end overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <img
              src={
                activeTab === "sun"
                  ? "/images/zodiac-sun.png"
                  : "/images/zodiac-moon.png"
              }
              alt="Zodiac background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex w-full h-full">
            {/* Sun Tab */}
            <button
              className={`flex-1 flex items-center justify-center pb-2 relative ${
                activeTab === "sun"
                  ? "text-purple-700 font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabChange("sun")}
            >
              <span className="text-yellow-400 text-5xl mr-2">☀️</span>

              {activeTab === "sun" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-600" />
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
              <span className="text-yellow-300 text-5xl mr-2">🌙</span>

              {activeTab === "moon" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-purple-600" />
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
              <div className="w-12 h-12 rounded-full border-2 border-purple-500 flex items-center justify-center bg-white overflow-hidden p-1">
                <img
                  src={`/images/${currentZodiac.toLowerCase()}.png`}
                  alt="Zodiac Sign"
                />
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
                    {currentZodiac}
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
              className="flex items-center text-purple-500 hover:text-purple-700"
              onClick={handleChange}
              disabled={isChanging}
            >
              <span className="mr-1">Change</span>
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          {/* Horoscope content */}
          {isContentLoading ? (
            <ContentSkeleton />
          ) : (
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <span className="text-lg mr-2">
                  {activeTab === "sun" ? "✨" : "🌙"}
                </span>
                <span className="font-medium text-gray-700">
                  {activeTab === "sun" ? "Sun Vibes:" : "Moon Vibes:"}
                </span>
              </div>

              <div
                className={`text-gray-600 transition-opacity duration-300 text-sm ${
                  isChanging ? "opacity-0" : "opacity-100"
                }`}
              >
                {horoscopeData && horoscopeData.witty_message}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
