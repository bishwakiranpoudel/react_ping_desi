"use client";

import { CloudRain } from "lucide-react";
import { useState, useEffect } from "react";
import { handlePostRequest } from "../../hooks/api";
import { toast } from "react-toastify";

export default function WeatherCard({
  backgroundImg = "/images/cloudy-background.png",
  weatherIcon = <CloudRain className="h-5 w-5 text-indigo-400" />,
  dayIcon = "/images/sun-icon.png",
  nightIcon = "/images/moon-icon.png",
}) {
  const [weatherData, setWeatherData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);

  const requestData = {
    lat: "30.2672",
    lang: "-97.7431",
    geohash: "9v6m",
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await handlePostRequest(
          "/news/wetherReport",
          requestData,
          {},
          false
        );
        if (response && response.data) {
          setWeatherData(response);
        }
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

    fetchWeather();
  }, []);

  // Extract data from the response
  const maxtemp = weatherData?.data?.maxtemp || 0;
  const mintemp = weatherData?.data?.mintemp || 0;
  const trending = weatherData?.data?.trending || "Weather forecast";
  const algtrending =
    weatherData?.data?.algtrending ||
    "Weather details unavailable at the moment.";

  // Skeleton loader component
  const WeatherCardSkeleton = () => (
    <div className="max-w-md mx-auto">
      <div className="rounded-2xl border overflow-hidden shadow-sm bg-gray-100">
        {/* Card Header Skeleton */}
        <div className="relative p-4 flex justify-between items-center bg-gray-200 h-24">
          {/* Day Section Skeleton */}
          <div className="flex items-center overflow-x-hidden">
            <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="ml-1 flex flex-col justify-center">
              <div className="h-4 w-16 bg-gray-300 rounded animate-pulse mb-1"></div>
              <div className="flex items-center gap-1">
                <div className="h-6 w-10 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-3 w-14 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Divider Skeleton */}
          <div className="h-16 w-px bg-gray-300"></div>

          {/* Night Section Skeleton */}
          <div className="flex items-center overflow-x-hidden">
            <div className="ml-4 flex flex-col justify-center">
              <div className="h-4 w-16 bg-gray-300 rounded animate-pulse mb-1"></div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-10 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-3 w-14 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse ml-1"></div>
          </div>
        </div>

        {/* Card Content Skeleton */}
        <div className="p-4 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-5 w-5 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-5 w-32 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="h-4 w-full bg-gray-300 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  if (isProcessing) {
    return <WeatherCardSkeleton />;
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-2xl border overflow-hidden shadow-sm bg-gray-100">
        {/* Card Header with Day/Night Info */}
        <div className="relative p-4 flex justify-between items-center">
          {/* Background Image with blur effect */}
          <div className="absolute inset-0">
            <div className="relative w-full h-full">
              <img
                src={backgroundImg || "/placeholder.svg"}
                alt="Background"
                className="object-cover rounded-t-2xl w-full h-full absolute"
                style={{
                  filter: "blur(1px) brightness(0.9)",
                  transform: "scale(1.05)",
                }}
              />
            </div>
          </div>

          {/* Content overlay */}
          <div className="relative z-10 flex justify-between items-center w-full">
            {/* Day Section */}
            <div className="flex items-center overflow-x-hidden">
              <div className="h-full flex-shrink-0">
                <img
                  src={dayIcon || "/placeholder.svg"}
                  alt="Day icon"
                  className="h-full object-contain rounded-full"
                />
              </div>

              <div className="ml-1 flex flex-col justify-center">
                <div className="text-gray-800 font-medium font-afacad">
                  At Day
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold font-fraunces">
                    {maxtemp}°
                  </span>
                  <span className="text-sm text-gray-600 font-afacad ">
                    Highest
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-16 w-px bg-gray-300"></div>

            {/* Night Section */}
            <div className="flex items-center overflow-x-hidden">
              <div className="ml-4 flex flex-col justify-center">
                <div className="text-gray-800 font-medium font-afacad">
                  At Night
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold font-fraunces">
                    {mintemp}°
                  </span>
                  <span className="text-sm text-gray-600 font-afacad ">
                    Lowest
                  </span>
                </div>
              </div>

              <div className="h-full flex-shrink-0">
                <img
                  src={nightIcon || "/placeholder.svg"}
                  alt="Night icon"
                  className="h-full object-contain rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 bg-white">
          <div className="flex items-center gap-2 mb-2">
            {weatherIcon}
            <span className="font-medium text-gray-800 font-afacad">
              {trending}
            </span>
          </div>
          <p className="text-gray-600 text-sm font-afacad">{algtrending}</p>
        </div>
      </div>
    </div>
  );
}
