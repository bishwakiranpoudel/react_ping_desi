"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { handlePostRequest } from "../hooks/api";
import {
  Search,
  Home,
  MessageSquare,
  FileText,
  User,
  MoreHorizontal,
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
import HappeningCard from "../components/home_components/HappeningCard";

import {
  fetchMasterCities,
  retrieveMasterCity,
} from "../services/locationServices";
import { fetchWeatherForecast } from "../services/forecast";

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

  // Add these new state variables after the existing state declarations
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  /***********************social media*****************/
  const [postings, setPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const POSTS_PER_PAGE = 10;

  // Last element ref callback for intersection observer
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            fetchMorePosts();
          }
        },
        {
          rootMargin: "100px",
        }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Function to fetch initial posts
  const fetchInitialPosts = async () => {
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
        setHasMore(false);
      } else {
        setPostings(response.posts || []);
        setOffset(POSTS_PER_PAGE);
        setHasMore((response.posts || []).length >= POSTS_PER_PAGE);
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
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch more posts
  const fetchMorePosts = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    const geohash = localStorage.getItem("geohash") || "9v6m";
    const endpoint = "/posting/getAllPostings";
    const requestBody = { geohash, offset };

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
        setHasMore(false);
      } else {
        const newPosts = response.posts || [];
        if (newPosts.length > 0) {
          setPostings((prevPosts) => [...prevPosts, ...newPosts]);
          setOffset((prevOffset) => prevOffset + POSTS_PER_PAGE);
          setHasMore(newPosts.length >= POSTS_PER_PAGE);
        } else {
          setHasMore(false);
        }
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
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialPosts();
  }, []);

  console.log(postings, "posting");

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

  /* ---------------------- Retrieving All Master Cities --------------------*/
  const [masterCities, setMasterCities] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    state: "",
    city: "",
  });
  useEffect(() => {
    async function fetchMasterCity() {
      try {
        if (isProcessing) {
          return;
        }
        setIsProcessing(true);
        const citiesResponse = fetchMasterCities();

        setMasterCities(citiesResponse.data);
      } catch (error) {
        /*
        toast.error(
          "" + (error.response?.data?.message ?? error.data?.message ?? error),
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true
          }
        );
        */
      } finally {
        setIsProcessing(false);
      }
    }
    fetchMasterCity();
  }, []);

  async function handleLocationChange() {
    // Normally wont be 0.0 but we only want it to changed based on dropdown data
    const payload = {
      latitude: 0.0,
      longitude: 0.0,
      city: selectedLocation.city,
      state: selectedLocation.state,
    };
    console.log("pay", payload);
    try {
      if (isProcessing) {
        return;
      }
      setIsProcessing(true);
      const cityResponse = await retrieveMasterCity(payload);
      localStorage.setItem("geohash", cityResponse.geohash[0].geohash);
      setMasterCities(cityResponse.geohash[0]);
    } catch (error) {
      /*
        toast.error(
          "" + (error.response?.data?.message ?? error.data?.message ?? error),
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true
          }
        );
        */
    } finally {
      setIsProcessing(false);
    }
  }
  /* ----------------------- Location Service end ----------------------_*/

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
    </div>
  );

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
              <NotificationCard
                onClose={handleCloseClick}
                isMobile={isMobile}
              />
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
                  {postings?.map((post, index) => (
                    <div
                      key={post.id || post._id || index}
                      ref={
                        index === postings.length - 1
                          ? lastPostElementRef
                          : null
                      }
                      className="min-w-full"
                    >
                      <SocialPostCard post={post} isMobile={isMobile} />
                    </div>
                  ))}
                </div>
              </div>
              {loading && <LoadingSpinner />}
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
                  <HappeningCard
                    image="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                    imageAlt="Gender Reveal Party"
                    category={{
                      name: "Community",
                      icon: "👨‍👩‍👧‍👦",
                      bgColor: "bg-blue-100",
                      textColor: "text-blue-800",
                    }}
                    title="Our Gender Reveal Party"
                    description="Join us as we reveal the exciting news and celebrate with family and friends!"
                    time="11:00 AM"
                    location="Cesar Chavez Avenue"
                    date={{ day: 13, month: "Nov", year: 2024 }}
                    isMobile={true}
                    onGetDirection={() =>
                      console.log(
                        "Get direction clicked for Gender Reveal Party"
                      )
                    }
                  />
                  <HappeningCard
                    image="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                    imageAlt="Another Event"
                    category={{
                      name: "Entertainment",
                      icon: "🎭",
                      bgColor: "bg-purple-100",
                      textColor: "text-purple-800",
                    }}
                    title="Storytelling Night"
                    description="Join us for an evening of traditional Desi stories and folklore with community members."
                    time="7:00 PM"
                    location="Community Center"
                    date={{ day: 15, month: "Nov", year: 2024 }}
                    isMobile={true}
                    onGetDirection={() =>
                      console.log(
                        "Get direction clicked for Storytelling Night"
                      )
                    }
                  />
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
                  <img
                    src={"/images/home_icon.svg"}
                    alt="Home icon"
                    className="w-5 h-5"
                  />

                  <span>Home</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
                >
                  <img
                    src={"/images/search_icon.svg"}
                    alt="Discover icon"
                    className="w-5 h-5"
                  />

                  <span>Discover</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
                >
                  <img
                    src={"/images/scoops_icon.svg"}
                    alt="scoops icon"
                    className="w-5 h-5"
                  />

                  <span>Scoops</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
                >
                  <img
                    src={"/images/classfields_icon.svg"}
                    alt="classfields icon"
                    className="w-5 h-5"
                  />

                  <span>Classifieds</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
                >
                  <img
                    src={"/images/profile_icon.svg"}
                    alt="profile icon"
                    className="w-5 h-5"
                  />

                  <span>Profile</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
                >
                  <img
                    src={"/images/more_icon.svg"}
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

            {/* Social Posts with Infinite Scroll */}
            {postings?.map((post, index) => (
              <div
                key={post.id || post._id || index}
                ref={index === postings.length - 1 ? lastPostElementRef : null}
              >
                <SocialPostCard
                  post={post}
                  username="Bishwa Kiran Poudel"
                  images={[post.photopath]}
                />
              </div>
            ))}

            {/* Loading indicator */}
            {loading && <LoadingSpinner />}

            {/* End of content message */}
            {!loading && !hasMore && postings.length > 0 && (
              <div className="text-center py-4 text-gray-500">
                You've reached the end of the content
              </div>
            )}
            <h1 className="text-xl lg:text-2xl font-bold mb-4 mt-3 font-fraunces">
              Happening Near You
            </h1>
            <HappeningCard
              image="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
              imageAlt="Gender Reveal Party"
              category={{
                name: "Community",
                icon: "👨‍👩‍👧‍👦",
                bgColor: "bg-blue-100",
                textColor: "text-blue-800",
              }}
              title="Our Gender Reveal Party"
              description="Join us as we reveal the exciting news and celebrate with family and friends!"
              time="11:00 AM"
              location="Cesar Chavez Avenue"
              date={{ day: 13, month: "Nov", year: 2024 }}
              isMobile={false}
              onGetDirection={() =>
                console.log("Get direction clicked for Gender Reveal Party")
              }
            />

            <HappeningCard
              image="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
              imageAlt="Another Event"
              category={{
                name: "Entertainment",
                icon: "🎭",
                bgColor: "bg-purple-100",
                textColor: "text-purple-800",
              }}
              title="Storytelling Night"
              description="Join us for an evening of traditional Desi stories and folklore with community members."
              time="7:00 PM"
              location="Community Center"
              date={{ day: 15, month: "Nov", year: 2024 }}
              isMobile={false}
              onGetDirection={() =>
                console.log("Get direction clicked for Storytelling Night")
              }
            />
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
