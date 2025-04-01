import { useState } from "react";
import { cn } from "../../lib/utils";
import WeatherCard from "./WeatherCard";
import AllergyCard from "./AllergyCard";
import HoroscopeCard from "./HoroscopeCard";

export function TabbedContent({
  weatherProps = {},
  allergyProps = {},
  horoscopeProps = {},
}) {
  const [activeTab, setActiveTab] = useState("weather");

  return (
    <div className="mb-6">
      {/* Tabs */}
      <div className="flex justify-center mb-4 relative">
        <div className="flex space-x-4 relative">
          <button
            onClick={() => setActiveTab("allergies")}
            className={cn(
              "px-2 py-1 transition-all duration-300 relative",
              activeTab === "allergies"
                ? "opacity-100 scale-100"
                : activeTab === "weather"
                ? "opacity-60 scale-90 -translate-x-2"
                : "opacity-60 scale-90 translate-x-2"
            )}
          >
            Allergies
          </button>
          <button
            onClick={() => setActiveTab("weather")}
            className={cn(
              "px-2 py-1 transition-all duration-300 relative",
              activeTab === "weather"
                ? "opacity-100 scale-100"
                : "opacity-60 scale-90"
            )}
          >
            Weather
          </button>
          <button
            onClick={() => setActiveTab("horoscope")}
            className={cn(
              "px-2 py-1 transition-all duration-300 relative",
              activeTab === "horoscope"
                ? "opacity-100 scale-100"
                : activeTab === "weather"
                ? "opacity-60 scale-90 translate-x-2"
                : "opacity-60 scale-90 -translate-x-2"
            )}
          >
            Horoscope
          </button>
        </div>

        {/* Active tab indicator */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <div className="flex space-x-1">
            <div
              className={`h-1.5 w-1.5 rounded-full ${
                activeTab === "allergies" ? "bg-purple-600" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`h-1.5 w-1.5 rounded-full ${
                activeTab === "weather" ? "bg-purple-600" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`h-1.5 w-1.5 rounded-full ${
                activeTab === "horoscope" ? "bg-purple-600" : "bg-gray-300"
              }`}
            ></div>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="transition-all duration-300">
        {activeTab === "weather" && <WeatherCard {...weatherProps} />}

        {activeTab === "allergies" && <AllergyCard {...allergyProps} />}

        {activeTab === "horoscope" && <HoroscopeCard {...horoscopeProps} />}
      </div>
    </div>
  );
}
