"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type Tab = "weather" | "allergies" | "horoscope"

export function TabbedContent() {
  const [activeTab, setActiveTab] = useState<Tab>("weather")

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
                  : "opacity-60 scale-90 translate-x-2",
            )}
          >
            Allergies
          </button>
          <button
            onClick={() => setActiveTab("weather")}
            className={cn(
              "px-2 py-1 transition-all duration-300 relative",
              activeTab === "weather" ? "opacity-100 scale-100" : "opacity-60 scale-90",
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
                  : "opacity-60 scale-90 -translate-x-2",
            )}
          >
            Horoscope
          </button>
        </div>

        {/* Active tab indicator */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <div className="flex space-x-1">
            <div
              className={`h-1.5 w-1.5 rounded-full ${activeTab === "allergies" ? "bg-purple-600" : "bg-gray-300"}`}
            ></div>
            <div
              className={`h-1.5 w-1.5 rounded-full ${activeTab === "weather" ? "bg-purple-600" : "bg-gray-300"}`}
            ></div>
            <div
              className={`h-1.5 w-1.5 rounded-full ${activeTab === "horoscope" ? "bg-purple-600" : "bg-gray-300"}`}
            ></div>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      <div className="transition-all duration-300">
        {activeTab === "weather" && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="text-sm text-gray-500">At Day</div>
                <div className="flex items-center">
                  <div className="text-2xl font-bold">24°</div>
                  <div className="text-xs ml-1">Highest</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-xl">☀️</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">At Night</div>
                <div className="flex items-center justify-end">
                  <div className="text-2xl font-bold">11°</div>
                  <div className="text-xs ml-1">Lowest</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🌙</span>
                </div>
              </div>
            </div>
            <div className="text-sm mt-4">
              <p className="font-medium flex items-center">
                <span className="mr-1">🌧️</span> Grab your chai & maybe an umbrella!
              </p>
              <p className="text-gray-600 mt-1">
                There's a teeny tiny chance the skies might cry a little today. Keep one eye on the clouds... just in
                case!
              </p>
            </div>
          </div>
        )}

        {activeTab === "allergies" && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-xl">🌲</span>
                </div>
                <div className="text-xs mt-1">Tree</div>
                <div className="text-xs text-green-600 font-medium">Low</div>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-xl">🌾</span>
                </div>
                <div className="text-xs mt-1">Ragweed</div>
                <div className="text-xs text-yellow-600 font-medium">Medium</div>
              </div>
              <div className="text-center">
                <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-xl">🌼</span>
                </div>
                <div className="text-xs mt-1">Mold</div>
                <div className="text-xs text-red-600 font-medium">High</div>
              </div>
            </div>
            <div className="mt-4">
              <p className="font-medium flex items-center text-red-500">
                <span className="mr-1">⚠️</span> Allergy Alert: High Pollen Count
              </p>
              <p className="text-sm text-gray-600 mt-1">
                High pollen levels expected this afternoon. If you're allergy-prone, consider limiting outdoor time and
                taking antihistamines.
              </p>
            </div>
          </div>
        )}

        {activeTab === "horoscope" && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-center mb-4">
              <div className="text-sm mb-2">Select Your Sun Sign</div>
              <div className="grid grid-cols-3 gap-4">
                <div className="relative">
                  <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-xl">♓</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="h-16 w-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-xl">♈</span>
                  </div>
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="h-16 w-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-xl">♉</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <h3 className="text-xl font-bold text-purple-600">Aries</h3>
              <p className="text-sm text-gray-600 mt-2">
                Today is a great day for new beginnings. Your energy is high and your confidence is soaring. Take
                advantage of this positive momentum to start something you've been putting off.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

