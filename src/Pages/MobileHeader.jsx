"use client";

import { Menu } from "react-feather";
import LocationDisplay from "../components/home_components/Locations";

function MobileHeader({ onMenuClick, menu = false }) {
  return (
    <header className="top-0 left-0 right-0 z-30 border-b">
      <div className="flex items-center p-4">
        {menu && (
          <button
            className="bg-none border-none cursor-pointer"
            onClick={onMenuClick}
          >
            <Menu size={24} />
          </button>
        )}

        <div className="p-4 border-b">
          <div className="flex items-center">
            <img
              src="/images/ping-desi-logo.png"
              alt="Ping Desi logo"
              width={20}
              height={20}
              className="object-contain mr-2"
            />
            <div className="font-semibold text-[#7B189F]">Ping Desi</div>
          </div>
          <div className="text-sm text-gray-700 pl-7">
            <LocationDisplay />
          </div>
        </div>
      </div>
    </header>
  );
}

export default MobileHeader;
