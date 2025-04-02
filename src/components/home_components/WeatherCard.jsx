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
  const [weatherData, setWeatherData] = useState({
    status: "success",
    count: 1,
    data: {
      id: 16611,
      mintemp: "70",
      maxtemp: "83",
      tempinfo: null,
      pollenday: null,
      pollennight: null,
      trending: "Splish-Splash, it's a Rainy Day Bash!",
      day: "2025-04-02T00:00:00.000Z",
      hour: null,
      status: null,
      createdby: null,
      createddate: null,
      updatedby: null,
      updateddate: null,
      tempicon: null,
      dayicon: 8,
      nighticon: 34,
      geohash: "9v6m",
      long: "-97.7431",
      lat: "30.2672",
      key: "351193",
      algtrending:
        "Well, darling, it's time to dust off those wellies and cozy sweaters because Mother Nature is serving up a cool, wet day!",
      dayiconphrase: "Dreary",
      nighticonphrase: "Mostly clear",
    },
  });
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
  const {
    mintemp,
    maxtemp,
    trending,
    algtrending,
    dayiconphrase,
    nighticonphrase,
  } = weatherData.data;

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
            <div className="flex flex-col items-center">
              <div className="text-gray-800 font-medium font-afacad">
                At Day
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold font-fraunces">
                  {maxtemp}°
                </span>
                <span className="text-sm text-gray-600 font-afacad">
                  Highest
                </span>
              </div>
              <div className="w-10 h-10 relative mt-1 bg-white/50 rounded-full p-1">
                <img
                  src={dayIcon}
                  alt={dayiconphrase}
                  className="w-full h-full object-contain absolute inset-0"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="h-16 w-px bg-gray-300"></div>

            {/* Night Section */}
            <div className="flex flex-col items-center">
              <div className="text-gray-800 font-medium font-afacad">
                At Night
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold font-fraunces">
                  {mintemp}°
                </span>
                <span className="text-sm text-gray-600 font-afacad">
                  Lowest
                </span>
              </div>
              <div className="w-10 h-10 relative mt-1 bg-white/50 rounded-full p-1">
                <img
                  src={nightIcon}
                  alt={nighticonphrase}
                  className="w-full h-full object-contain absolute inset-0"
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
