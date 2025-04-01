import { Star, RefreshCw, Sun, Moon } from "lucide-react";

export default function HoroscopeCard() {
  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-2xl border overflow-hidden shadow-sm bg-gray-50 font-afacad">
        {/* Card Header with Zodiac Info */}
        <div className="p-4 relative">
          {/* Background zodiac wheel pattern - positioned on the right side with increased visibility */}
          <div className="absolute top-1 right-1 w-16 h-16">
            <img
              src="/images/zodiac-wheel-bg.png"
              alt="Zodiac wheel background"
              width={64}
              height={64}
              className="object-contain opacity-10"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-between">
            {/* Left side - Zodiac icons */}
            <div className="flex items-center gap-2">
              {/* First icon with white circle border */}
              <div className="relative w-10 h-10 bg-white rounded-full p-0.5 flex items-center justify-center shadow-sm">
                <img
                  src="/images/sagittarius-icon.png"
                  alt="Sagittarius icon"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>

              {/* Second icon with white circle border */}
              <div className="relative w-10 h-10 bg-white rounded-full p-0.5 flex items-center justify-center shadow-sm">
                <img
                  src="/images/sagittarius-small.png"
                  alt="Sagittarius symbol"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Middle - Zodiac names */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Sun className="h-3.5 w-3.5 mr-1 text-gray-400" />
                  <span className="font-medium text-gray-800">Sagittarius</span>
                </div>
                <div className="flex items-center text-purple-600">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  <span className="text-xs font-medium">Change</span>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Moon className="h-3.5 w-3.5 mr-1" />
                <span>Capricorn</span>
              </div>
            </div>

            {/* Right side - Spacer for alignment */}
            <div className="w-8 h-8 relative">
              {/* Additional zodiac wheel icon to ensure visibility */}
              <img
                src="/images/zodiac-wheel-bg.png"
                alt="Zodiac wheel icon"
                className="object-contain opacity-10 w-full h-full absolute"
              />
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="font-medium text-gray-800">
              Today's Vibe: Embrace the Unexpected
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            A spontaneous twist may bring excitement and new connections today.
            Stay open and adaptable to make the most of opportunities that
            arise.
          </p>
        </div>
      </div>
    </div>
  );
}
