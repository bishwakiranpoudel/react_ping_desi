import PromotionCardLight from "../components/home_components/PromotionCardLight";

function LeftSidebar({ viewportHeight }) {
  return (
    <aside
      className="col-span-4 lg:col-span-2 xl:col-span-2 border-r font-afacad"
      style={{
        height: viewportHeight,
        position: "sticky",
        top: 0,
        overflowY: "auto",
        background:
          "linear-gradient(to bottom, #ffe9f3, #ffe1e9, #ffc8ce, #ffd7e6)",
      }}
    >
      <div className="flex flex-col h-full">
        {/* Location Header */}
        <div className="p-4 border-b">
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
                Los Angeles, Cesar Avenue
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4">
          <div className="space-y-1 px-3">
            <a
              href="/"
              className="flex items-center gap-3 text-sm py-2 px-3 rounded-md bg-white"
            >
              <img
                src="/images/home_icon.svg"
                alt="Home icon"
                className="w-5 h-5"
              />
              <span>Home</span>
            </a>
            <a
              href="/discover"
              className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
            >
              <img
                src="/images/search_icon.svg"
                alt="Discover icon"
                className="w-5 h-5"
              />
              <span>Discover</span>
            </a>
            <a
              href="/scoops"
              className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
            >
              <img
                src="/images/scoops_icon.svg"
                alt="scoops icon"
                className="w-5 h-5"
              />
              <span>Scoops</span>
            </a>
            <a
              href="/classifieds"
              className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
            >
              <img
                src="/images/classfields_icon.svg"
                alt="classfields icon"
                className="w-5 h-5"
              />
              <span>Classifieds</span>
            </a>
            <a
              href="/profile"
              className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
            >
              <img
                src="/images/profile_icon.svg"
                alt="profile icon"
                className="w-5 h-5"
              />
              <span>Profile</span>
            </a>
            <a
              href="/more"
              className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
            >
              <img
                src="/images/more_icon.svg"
                alt="more icon"
                className="w-5 h-5"
              />
              <span>More</span>
            </a>
          </div>
        </nav>
        <PromotionCardLight />
      </div>
    </aside>
  );
}

export default LeftSidebar;
