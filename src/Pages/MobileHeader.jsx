"use client";

import { Menu } from "react-feather";

function MobileHeader({ onMenuClick }) {
  return (
    <header className="top-0 left-0 right-0 z-30 border-b">
      <div className="flex items-center p-4">
        <button onClick={onMenuClick} className="mr-3">
          <Menu className="h-6 w-6" />
        </button>

        <div className="p-4">
          <div className="flex items-center">
            <img
              src="/images/ping-desi-logo.png"
              alt="Ping Desi logo"
              width={20}
              height={20}
              className="object-contain mr-2"
            />

            <div>
              <div className="font-semibold text-[#7B189F]">Ping Desi</div>
              <div className="text-sm text-gray-700">
                Los Angeles, Cesar Chavez Avenue
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default MobileHeader;
