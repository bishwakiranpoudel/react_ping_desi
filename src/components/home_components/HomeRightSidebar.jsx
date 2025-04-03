import WeatherCard from "./WeatherCard";
import AllergyCard from "./AllergyCard";
import HoroscopeCard from "./HoroscopeCard";

function HomeRightSidebar() {
  return (
    <div className="p-5 flex flex-col">
      {/* Header section */}
      <div className="mb-2">
        <div className="text-gray-500 text-sm mb-1">Thursday, 30 Jan</div>
        <h2 className="text-xl font-bold font-fraunces">
          <span>Today's </span>
          <span className="">Forecast</span>
        </h2>
      </div>

      {/* Cards container with flex layout and fixed gap */}
      <div className="flex flex-col gap-[10px] mt-2">
        <WeatherCard />
        <AllergyCard />
        <HoroscopeCard />

        {/* Divider */}
        <div className="w-full h-px bg-gray-200 my-4" />
        <div className="mb-2">
          <h2 className="text-xl font-bold font-fraunces">
            <span>Local </span>
            <span>Buzz</span>
          </h2>
        </div>
        {/* Top Local Buzz Section */}
        <div className="w-[99%] mx-auto bg-white p-4 overflow-hidden font-afacad">
          <div className="space-y-5">
            {/* The Verge News */}
            <div className="flex items-start">
              <div className="h-8 w-8 bg-purple-600 rounded flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-white text-xs">V</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">The Verge</div>
                <h4 className="font-medium">
                  Local Farmers' Market Extends Weekly Hours
                </h4>
              </div>
            </div>

            {/* The New York Times News */}
            <div className="flex items-start">
              <div className="h-8 w-8 bg-black rounded flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-white text-xs">T</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">The New York Times</div>
                <h4 className="font-medium">
                  Road Closures Announced for Upcoming Festival
                </h4>
              </div>
            </div>

            {/* The Guardian News */}
            <div className="flex items-start">
              <div className="h-8 w-8 bg-blue-800 rounded flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-white text-xs">G</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">The Guardian</div>
                <h4 className="font-medium">
                  City Council Approves Affordable Housing Project
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeRightSidebar;
