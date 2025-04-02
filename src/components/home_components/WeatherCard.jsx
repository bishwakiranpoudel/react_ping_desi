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
                    {dayTemp}°
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
                    {nightTemp}°
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
              {title}
            </span>
          </div>
          <p className="text-gray-600 text-sm font-afacad">{description}</p>
        </div>
      </div>
    </div>
  );
}
