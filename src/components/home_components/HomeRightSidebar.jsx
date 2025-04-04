import WeatherCard from "./WeatherCard";
import AllergyCard from "./AllergyCard";
import HoroscopeCard from "./HoroscopeCard";
import NewsCard from "./NewsCard";

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
            <NewsCard />

            <NewsCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeRightSidebar;
