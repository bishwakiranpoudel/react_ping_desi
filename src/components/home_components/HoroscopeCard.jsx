import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useEffect } from "react";
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
  const dayIcon = "/images/sun-icon.png";
  const nightIcon = "/images/moon-icon.png";
  // State for current zodiac sign index and active tab
  const [currentIndex, setCurrentIndex] = useState(0); // Default to Aries
  const [activeTab, setActiveTab] = useState("sun"); // Default to sun tab
  const [isChanging, setIsChanging] = useState(false);
  const [horoscopeData, setHoroscopeData] = useState([]);

  // Get current zodiac sign
  const currentZodiac = zodiacSigns[currentIndex];

  // Handle tab change (sun or moon)
  const handleTabChange = (tab) => {
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  };

  // Gettting Horoscope Data
  useEffect(() => {
    async function fetchHoroscopes() {
      try {
        const payload = {
          mode: activeTab,
          sign: zodiacSigns[currentIndex],
        };
        const horoscopeResponse = await fetchHoroscope(payload);
        setHoroscopeData(horoscopeResponse.horoscope);
      } catch (error) {
        toast.error("Error while fetching the horoscope");
      }
    }
    fetchHoroscopes();
  }, [activeTab, currentIndex]);

  // Handle zodiac change
  const handleChange = () => {
    if (isChanging) return;
    setIsChanging(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % zodiacSigns.length);
      setIsChanging(false);
    }, 300);
  };

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
              <span className="text-yellow-400 text-5xl mr-2">
                <img
                  src={dayIcon}
                  alt="Day icon"
                  className="h-full object-contain rounded-full bg-white/10 backdrop-blur-sm"
                />
              </span>

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
              <span className="text-yellow-300 text-5xl mr-2">
                <img
                  src={nightIcon}
                  alt="Night icon"
                  className={`h-full object-contain rounded-full bg-white/10 backdrop-blur-sm ${
                    activeTab === "moon" ? "border-[#7B189F]" : ""
                  }`}
                />
              </span>

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
        </div>
      </div>
    </div>
  );
}
