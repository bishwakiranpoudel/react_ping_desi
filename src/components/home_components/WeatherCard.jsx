import { CloudRain } from "lucide-react";

export default function WeatherCard({
  dayTemp = 24,
  nightTemp = 11,
  dayIcon = "/images/sun-icon.png",
  nightIcon = "/images/moon-icon.png",
  backgroundImg = "/images/cloudy-background.png",
  title = "Grab your chai & maybe an umbrella!",
  description = "There's a teeny tiny chance the skies might cry a little today. Keep one eye on the clouds... just in case!",
  weatherIcon = <CloudRain className="h-5 w-5 text-indigo-400" />,
}) {
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
                <span className="text-2xl  font-bold font-fraunces">
                  {dayTemp}°
                </span>
                <span className="text-sm text-gray-600 font-afacad">
                  Highest
                </span>
              </div>
              <div className="w-10 h-10 relative mt-1 bg-white/50 rounded-full p-1">
                <img
                  src={dayIcon}
                  alt="Day icon"
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
                  {nightTemp}°
                </span>
                <span className="text-sm text-gray-600 font-afacad">
                  Lowest
                </span>
              </div>
              <div className="w-10 h-10 relative mt-1 bg-white/50 rounded-full p-1">
                <img
                  src={nightIcon}
                  alt="Night icon"
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
              {title}
            </span>
          </div>
          <p className="text-gray-600 text-smfont-afacad">{description}</p>
        </div>
      </div>
    </div>
  );
}
