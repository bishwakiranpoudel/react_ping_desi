import { Link, useLocation } from "react-router-dom";
import PromotionCardLight from "../components/home_components/PromotionCardLight";
import LocationDisplay from "../components/home_components/Locations";

function LeftSidebar({ viewportHeight }) {
  // Get current location to determine active route
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper function to determine if a link is active
  const isActive = (path) => {
    if (path === "/" && currentPath === "/") {
      return true;
    }
    return path !== "/" && currentPath.startsWith(path);
  };

  // Navigation items
  const navItems = [
    { path: "/", label: "Home", icon: "/images/home_icon.svg" },
    { path: "/discover", label: "Discover", icon: "/images/search_icon.svg" },
    { path: "/scoops", label: "Scoops", icon: "/images/scoops_icon.svg" },
    {
      path: "/classifieds",
      label: "Classifieds",
      icon: "/images/classfields_icon.svg",
    },
    { path: "/profile", label: "Profile", icon: "/images/profile_icon.svg" },
    { path: "/more", label: "More", icon: "/images/more_icon.svg" },
  ];

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

        overflowX: "auto",

        WebkitOverflowScrolling: "touch",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
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
            <div className="font-semibold text-[#7B189F]">Ping Desi</div>
          </div>
          <div className="text-sm text-gray-700 pl-7">
            <LocationDisplay />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4">
          <div className="space-y-1 px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 text-sm py-2 px-3 rounded-md ${
                  isActive(item.path) ? "bg-white" : "hover:bg-white"
                }`}
              >
                <img
                  src={item.icon || "/placeholder.svg"}
                  alt={`${item.label} icon`}
                  className="w-5 h-5"
                />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
        <PromotionCardLight />
      </div>
    </aside>
  );
}

export default LeftSidebar;
