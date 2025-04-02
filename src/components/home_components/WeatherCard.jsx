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
        console.log(response, "Weather Response");
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

  if (isProcessing) {
    return (
      <div className="max-w-md mx-auto">
        <div className="rounded-2xl border overflow-hidden shadow-sm bg-gray-100 p-4">
          <p className="text-center">Loading weather data...</p>
        </div>
      </div>
    );
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
                src={backgroundImg}
                alt="Background"
                className="object-cover rounded-t-2xl w-full h-full absolute"
                style={{
                  filter: "blur(1px) brightness(0.9)",
                  transform: "scale(1.05)", // Slightly scale up to avoid blur edges
                }}
              />
            </div>
          </div>

          {/* Content overlay */}
          <div className="relative z-10 flex justify-between items-center w-full">
            {/* Day Section */}

            <div class="flex items-center">
              <div class="h-full flex-shrink-0">
                <img
                  src={dayIcon}
                  alt="Day icon"
                  class="h-full object-contain rounded-full"
                />
              </div>

              <div class="ml-4 flex flex-col justify-center">
                <div class="text-gray-800 font-medium font-afacad">At Day</div>
                <div class="flex items-center gap-2">
                  <span class="text-2xl font-bold font-fraunces">
                    {maxtemp}°
                  </span>
                  <span class="text-sm text-gray-600 font-afacad">Highest</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-16 w-px bg-gray-300"></div>

            {/* Night Section */}
            <div class="flex items-center">
              <div class="ml-4 flex flex-col justify-center">
                <div class="text-gray-800 font-medium font-afacad">
                  At Night
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-2xl font-bold font-fraunces">
                    {mintemp}°
                  </span>
                  <span class="text-sm text-gray-600 font-afacad">Lowest</span>
                </div>
              </div>

              <div class="h-full flex-shrink-0">
                <img
                  src={nightIcon}
                  alt="Night icon"
                  class="h-full object-contain rounded-full"
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
