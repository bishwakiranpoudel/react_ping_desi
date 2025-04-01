"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { handlePostRequest } from "../hooks/api";
import {
  Search,
  Home,
  MessageSquare,
  FileText,
  User,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Heart,
  MessageCircle,
  ThumbsDown,
  X,
  Menu,
  MapPin,
} from "react-feather"; // Using react-feather instead of lucide-react
import { useIsMobile } from "../hooks/use-mobile";
import { TabbedContent } from "../components/home_components/tabbed-content";
import HoroscopeCard from "../components/home_components/HoroscopeCard";
import AllergyCard from "../components/home_components/AllergyCard";
import WeatherCard from "../components/home_components/WeatherCard";
import PromotionCard from "../components/home_components/PromotionCard";
import PromotionCardLight from "../components/home_components/PromotionCardLight";
import SocialPostCard from "../components/home_components/SocialPostCard";
import { useLocation } from "../context/location-context";
import NotificationCard from "../components/home_components/NotificationCard";
import HomePromotionCard from "../components/home_components/HomePromotionCard";
import BottomNavbar from "../components/home_components/BottomNavBar";
import MobileSidebar from "../components/home_components/MobileSidebar";

export default function HomePage() {
  // State to track viewport height for proper sidebar sizing
  const [viewportHeight, setViewportHeight] = useState("100vh");
  // State to track visibility of the first card
  const [isFirstCardVisible, setIsFirstCardVisible] = useState(true);
  // State to track visibility of the second card
  const [isSecondCardVisible, setIsSecondCardVisible] = useState(false);
  // State for mobile sidebar
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  // Check if we're on mobile
  const isMobile = useIsMobile();

  //Get location data
  const { locationData, requestLocation } = useLocation();

  // Add these new state variables after the existing state declarations
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  /***********************social media*****************/

  const [postings, setPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostings = async () => {
      setLoading(true);
      setError(null);

      const geohash = localStorage.getItem("geohash") || "9v6m";
      const endpoint = "/posting/getAllPostings";
      const requestBody = { geohash, offset: 0 };

      try {
        const response = await handlePostRequest(
          endpoint,
          requestBody,
          {},
          false
        );

        if (response?.error) {
          setError(response.error);
          toast.error(response.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          });
        } else {
          setPostings(response.posts);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ?? error.data?.message ?? error;
        setError(errorMessage);

        toast.error("" + errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPostings();
  }, []);

  console.log(postings, "posting");
  console.log(postings.posts, "posting");

  /***********************social media end*****************/

  // Function to handle close button click
  const handleCloseClick = () => {
    setIsFirstCardVisible(false);
    setIsSecondCardVisible(true);
  };

  // Update viewport height on resize and initial load
  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(`${window.innerHeight}px`);
    };

    // Set initial height
    updateViewportHeight();

    // Add resize listener
    window.addEventListener("resize", updateViewportHeight);

    // Cleanup
    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  // Add this new useEffect for scroll handling in the mobile view
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Determine if we should show or hide based on scroll direction
      // Also, don't hide navbar when at the top of the page
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setPrevScrollPos(currentScrollPos);
      setIsNavbarVisible(visible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, isMobile]);

  // Mobile layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 font-afacad">
        {/* Mobile Header */}
        <header
          className="fixed top-0 left-0 right-0  z-30 border-b"
          style={{
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            background:
              "linear-gradient(to bottom, #ffe9f3, #ffe1e9, #ffc8ce, #ffd7e6)",
          }}
        >
          <div className="flex items-center p-4">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="mr-3"
            >
              <Menu className="h-6 w-6" />
            </button>

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
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Main Content */}
        <main className="pt-[72px] pb-20">
          <div className="p-4">
            {/* First Card - Initially visible with close button */}
            {isFirstCardVisible && (
              <NotificationCard onClose={handleCloseClick} />
            )}

            {/* Second Card - Initially invisible, appears when first card is closed */}
            {isSecondCardVisible && <HomePromotionCard />}

            <TabbedContent />

            <section className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold font-frances">
                  Local Buzz
                </h2>
                <a href="#" className="text-sm text-gray-600 flex items-center">
                  Explore More <span className="ml-1">→</span>
                </a>
              </div>
              <div className="overflow-x-auto pb-2 ">
                <div className="flex space-x-4">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0">
                    <div className="relative h-32 w-full">
                      <img
                        src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                        alt="Farmers Market"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center mb-1">
                        <div className="h-5 w-5 bg-purple-600 rounded flex items-center justify-center mr-1.5">
                          <span className="text-white text-xs">V</span>
                        </div>
                        <span className="text-xs text-gray-500">The Verge</span>
                      </div>
                      <h3 className="font-medium text-sm leading-tight">
                        Local Farmers' Market Extends Weekly Hours
                      </h3>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0">
                    <div className="relative h-32 w-full">
                      <img
                        src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                        alt="Festival Float"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center mb-1">
                        <div className="h-5 w-5 bg-black rounded flex items-center justify-center mr-1.5">
                          <span className="text-white text-xs">T</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          The New York Times
                        </span>
                      </div>
                      <h3 className="font-medium text-sm leading-tight">
                        Road Closures Announced for Upcoming Festival
                      </h3>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0">
                    <div className="relative h-32 w-full">
                      <img
                        src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                        alt="Farmers Market"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center mb-1">
                        <div className="h-5 w-5 bg-purple-600 rounded flex items-center justify-center mr-1.5">
                          <span className="text-white text-xs">V</span>
                        </div>
                        <span className="text-xs text-gray-500">The Verge</span>
                      </div>
                      <h3 className="font-medium text-sm leading-tight">
                        Local Farmers' Market Extends Weekly Hours
                      </h3>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0">
                    <div className="relative h-32 w-full">
                      <img
                        src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                        alt="Festival Float"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center mb-1">
                        <div className="h-5 w-5 bg-black rounded flex items-center justify-center mr-1.5">
                          <span className="text-white text-xs">T</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          The New York Times
                        </span>
                      </div>
                      <h3 className="font-medium text-sm leading-tight">
                        Road Closures Announced for Upcoming Festival
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <PromotionCard />

            <section className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold font-fraunces">
                  Scoops Around You
                </h2>
                <a href="#" className="text-xs text-gray-600 flex items-center">
                  View all <span className="ml-1">→</span>
                </a>
              </div>
              {/* Social Post */}
              <div className="overflow-x-auto ">
                <div className="flex space-x-4">
                  {postings?.map((post) => (
                    <SocialPostCard
                      key={post.id || post._id}
                      post={post}
                      isMobile={isMobile}
                    />
                  ))}
                </div>
              </div>
            </section>

            <section className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold font-fraunces">
                  Happening Near You
                </h2>
                <a href="#" className="text-xs text-gray-600 flex items-center">
                  View all <span className="ml-1">→</span>
                </a>
              </div>
              {/* Happening cards*/}
              <div className="overflow-x-auto pb-2">
                <div
                  className="flex space-x-4"
                  style={{ minWidth: "min-content" }}
                >
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden w-[280px] flex-shrink-0">
                    <div className="relative h-40 w-full">
                      <img
                        src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                        alt="Gender Reveal Party"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-sm">
                        👨‍👩‍👧‍👦 Community
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">Our Gender Reveal Party</h3>
                      <p className="text-xs text-gray-600 mt-1 mb-2">
                        Join us as we reveal the exciting news and celebrate
                        with family and friends!
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium">11:00 AM</div>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" /> Cesar Chavez
                            Avenue
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="text-center bg-gray-100 rounded-sm p-1 w-10">
                            <div className="text-lg font-bold">13</div>
                            <div className="text-xs">Nov</div>
                            <div className="text-xs">2024</div>
                          </div>
                        </div>
                      </div>
                      <button className="mt-3 w-full py-1.5 bg-white border border-gray-300 text-gray-800 rounded-md text-sm">
                        Get Direction
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm overflow-hidden w-[280px] flex-shrink-0">
                    <div className="relative h-40 w-full">
                      <img
                        src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                        alt="Another Event"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-sm">
                        🎭 Entertainment
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">Storytelling Night</h3>
                      <p className="text-xs text-gray-600 mt-1 mb-2">
                        Join us for an evening of traditional Desi stories and
                        folklore with community members.
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium">7:00 PM</div>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" /> Community Center
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="text-center bg-gray-100 rounded-sm p-1 w-10">
                            <div className="text-lg font-bold">15</div>
                            <div className="text-xs">Nov</div>
                            <div className="text-xs">2024</div>
                          </div>
                        </div>
                      </div>
                      <button className="mt-3 w-full py-1.5 bg-white border border-gray-300 text-gray-800 rounded-md text-sm">
                        Get Direction
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold font-fraunces">
                  Just for You
                </h2>
                <a href="#" className="text-xs text-gray-600 flex items-center">
                  View all <span className="ml-1">→</span>
                </a>
              </div>
              {/* Just for you cards*/}
              <div className="relative">
                <div className="bg-[#f5f0e8] rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 flex items-center">
                    <div className="w-1/3">
                      <img
                        src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                        alt="VR Headset"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="w-2/3 pl-4">
                      <div className="text-red-500 text-xs font-medium mb-1">
                        LIMITED SALE
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm leading-tight mb-4">
                        EXPERIENCE THE SENSATION OF VIRTUAL REALITY.
                      </h3>
                      <div className="flex justify-end">
                        <button className="text-xs bg-transparent text-gray-700 font-medium">
                          View Deals
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center py-2">
                  <div className="flex space-x-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-600"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNavbar isNavbarVisible={isNavbarVisible} />

        {/* Mobile Sidebar */}
        <MobileSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
      </div>
    );
  }

  // Desktop layout (original code)
  return (
    <div className="flex justify-center w-full bg-pink-50 font-afacad">
      {/* Main container with max-width for large screens */}
      <div className="grid grid-cols-12 w-full max-w-[1600px] bg-white">
        {/* Left Sidebar - 20% width (spans 2.4/12 columns) */}
        <aside
          className="col-span-3 lg:col-span-2 xl:col-span-2 border-r  font-afacad"
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
                  href="#"
                  className="flex items-center gap-3 text-sm py-2 px-3 rounded-md bg-white"
                >
                  <Home className="h-5 w-5 text-gray-500" />
                  <span>Home</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
                >
                  <Search className="h-5 w-5 text-gray-500" />
                  <span>Discover</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
                >
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                  <span>Scoops</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
                >
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span>Classifieds</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
                >
                  <User className="h-5 w-5 text-gray-500" />
                  <span>Profile</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
                >
                  <MoreHorizontal className="h-5 w-5 text-gray-500" />
                  <span>More</span>
                </a>
              </div>
            </nav>
            <PromotionCardLight />
          </div>
        </aside>

        {/* Middle Content Area - 50% width (spans 6/12 columns) */}
        <main className="col-span-9 lg:col-span-7 xl:col-span-7 overflow-y-auto border-r border-gray-200">
          <div className="p-4 lg:p-6 max-w-5xl mx-auto">
            {/* First Card - Initially visible with close button */}
            {isFirstCardVisible && (
              <NotificationCard onClose={handleCloseClick} />
            )}

            {/* Second Card - Initially invisible, appears when first card is closed */}
            {isSecondCardVisible && <HomePromotionCard />}
            <h1 className="text-xl lg:text-2xl font-bold mb-4 mt-3 font-fraunces">
              Scoops Around You
            </h1>
            {postings?.map((post, index) => (
              <SocialPostCard
                key={post.id || post._id || index}
                username="Bishwa Kiran Poudel"
                images={[
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ofUhN9KOwqsoSgDe5cA9ZgKpazulFa.png",
                  "/placeholder.svg?height=400&width=600",
                  "/placeholder.svg?height=400&width=600",
                ]}
              />
            ))}
          </div>
        </main>

        {/* Right Sidebar - 30% width (spans 3.6/12 columns) */}
        <aside className="col-span-0 lg:col-span-3 xl:col-span-3 hidden lg:block border border-gray-100 overflow-y-auto">
          <div className="p-4 flex flex-col">
            {/* Header section */}
            <div className="mb-2">
              <div className="text-gray-500 text-sm mb-1">Thursday, 30 Jan</div>
              <h2 className="text-xl font-bold font-fraunces">
                <span>Today's </span>
                <span className=" ">Forecast</span>
              </h2>
            </div>

            {/* Cards container with flex layout and fixed gap */}
            <div className="flex flex-col gap-[10px] mt-2">
              <WeatherCard />
              <HoroscopeCard />
              <AllergyCard />

              {/* Divider */}
              <div className="w-full h-px bg-gray-200 my-4"></div>
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
                      <div className="text-sm text-gray-500">
                        The New York Times
                      </div>
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
        </aside>
      </div>
    </div>
  );
}
