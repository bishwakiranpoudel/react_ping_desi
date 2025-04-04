import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { useIsMobile } from "../hooks/use-mobile";
import { TabbedContent } from "../components/home_components/tabbed-content";
import NotificationCard from "../components/home_components/NotificationCard";
import PromotionCard from "../components/home_components/PromotionCard";
import SocialPostCard from "../components/home_components/SocialPostCard";
import HomePromotionCard from "../components/home_components/HomePromotionCard";
import HappeningCard from "../components/home_components/HappeningCard";
import MainLayout from "../components/MainLayout";
import HomeRightSidebar from "../components/home_components/HomeRightSidebar";

import {
  fetchMasterCities,
  retrieveMasterCity
} from "../services/locationServices";
import { fetchCommunityEvents } from "../services/events";
import { convertDateToObject } from "../lib/utils";
import { getPostings } from "../services/scoops";

import NewsCard from "../components/home_components/NewsCard";
import { getNews } from "../services/news";

function HomePage2() {
  // State to track visibility of the first card
  const [isFirstCardVisible, setIsFirstCardVisible] = useState(true);
  // State to track visibility of the second card
  const [isSecondCardVisible, setIsSecondCardVisible] = useState(false);
  // Check if we're on mobile
  const isMobile = useIsMobile();

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
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore) {
            fetchMorePosts();
          }
        },
        {
          rootMargin: "100px"
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
    const requestBody = { geohash, offset: 0 };

    try {
      const response = await getPostings(requestBody);
      setPostings(response.posts || []);
      setOffset(POSTS_PER_PAGE);
      setHasMore((response.posts || []).length >= POSTS_PER_PAGE);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ?? error.data?.message ?? error;
      setError(errorMessage);

      toast.error("" + errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true
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
      const response = await getPostings(requestBody);
      const newPosts = response.posts || [];
      if (newPosts.length > 0) {
        setPostings(prevPosts => [...prevPosts, ...newPosts]);
        setOffset(prevOffset => prevOffset + POSTS_PER_PAGE);
        setHasMore(newPosts.length >= POSTS_PER_PAGE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ?? error.data?.message ?? error;
      setError(errorMessage);
      toast.error("" + errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true
      });
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialPosts();
  }, []);

  /***********************social media end*****************/

  // Function to handle close button click
  const handleCloseClick = () => {
    setIsFirstCardVisible(false);
    setIsSecondCardVisible(true);
  };

  /* ---------------------- Retrieving All Master Cities --------------------*/
  const [masterCities, setMasterCities] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    state: "",
    city: ""
  });
  const [communityEvents, setCommunityEvents] = useState([]);

  useEffect(() => {
    async function fetchMasterCity() {
      try {
        if (isProcessing) {
          return;
        }
        setIsProcessing(true);
        const citiesResponse = await fetchMasterCities();

        setMasterCities(citiesResponse.data);
      } catch (error) {
        toast.error(
          "" + (error.response?.data?.message ?? error.data?.message ?? error),
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true
          }
        );
      } finally {
        setIsProcessing(false);
      }
    }
    fetchMasterCity();
  }, []);

  // Getting Community Events around me
  useEffect(() => {
    async function fetchCommunityEvent() {
      try {
        setIsProcessing(true);
        const eventsResponse = await fetchCommunityEvents({
          state: "Texas",
          city: "Austin"
        });
        setCommunityEvents(eventsResponse.data);
      } catch (error) {
        toast.error(
          "" + (error.response?.data?.message ?? error.data?.message ?? error),
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true
          }
        );
      } finally {
        setIsProcessing(false);
      }
    }
    fetchCommunityEvent();
  }, []);

  async function handleLocationChange() {
    // Normally wont be 0.0 but we only want it to changed based on dropdown data
    const payload = {
      latitude: 0.0,
      longitude: 0.0,
      city: selectedLocation.city,
      state: selectedLocation.state
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
      toast.error(
        "" + (error.response?.data?.message ?? error.data?.message ?? error),
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true
        }
      );
    } finally {
      setIsProcessing(false);
    }
  }
  /* ----------------------- Location Service end ----------------------_*/

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700" />
    </div>
  );

  // Render the home page content
  const renderHomeContent = () => {
    if (isMobile) {
      return (
        <div className="p-4">
          {/* First Card - Initially visible with close button */}
          {isFirstCardVisible && (
            <NotificationCard onClose={handleCloseClick} isMobile={isMobile} />
          )}

          {/* Second Card - Initially invisible, appears when first card is closed */}
          {isSecondCardVisible && <HomePromotionCard />}

          <TabbedContent />

          <section className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold font-frances">Local Buzz</h2>
              <a href="#" className="text-sm text-gray-600 flex items-center">
                Explore More <span className="ml-1">→</span>
              </a>
            </div>
            <div className="overflow-x-auto pb-2 ">
              <div className="flex space-x-4">
                <NewsCard isMobile="true" />

                <NewsCard isMobile="true" />
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
                {postings?.slice(0, 5).map((post, index) => (
                  <div
                    key={post.id || post._id || index}
                    ref={
                      index === Math.min(postings.length, 5) - 1
                        ? lastPostElementRef
                        : null
                    }
                    className="min-w-full"
                  >
                    <SocialPostCard
                      post={post}
                      isMobile={isMobile}
                      images={post.photopath ? post.photopath.split(",") : []}
                    />
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
                {communityEvents &&
                  communityEvents.map((event, index) => (
                    <HappeningCard
                      key={event.id || index}
                      image="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                      imageAlt="Gender Reveal Party"
                      category={{
                        name: "Community",
                        icon: "👨‍👩‍👧‍👦",
                        bgColor: "bg-blue-100",
                        textColor: "text-blue-800"
                      }}
                      title={event.name}
                      description={event.description}
                      time={event.time}
                      location={event.description}
                      date={convertDateToObject(event.date)}
                      isMobile={true}
                      onGetDirection={() =>
                        console.log(
                          "Get direction clicked for Gender Reveal Party"
                        )
                      }
                    />
                  ))}
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
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-600" />
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }

    // Desktop content
    return (
      <>
        {/* First Card - Initially visible with close button */}
        {isFirstCardVisible && <NotificationCard onClose={handleCloseClick} />}
        {/* Second Card - Initially invisible, appears when first card is closed */}
        {isSecondCardVisible && <HomePromotionCard />}
        <h1 className="text-xl lg:text-2xl font-bold mb-4 mt-3 font-fraunces">
          Scoops Around You
        </h1>

        {/* Social Posts with Infinite Scroll */}
        {postings?.slice(0, 5).map((post, index) => (
          <div
            key={post.id || post._id || index}
            ref={
              index === Math.min(postings.length, 5) - 1
                ? lastPostElementRef
                : null
            }
          >
            <SocialPostCard
              post={post}
              username={post.username}
              images={post.photopath ? post.photopath.split(",") : []}
            />
          </div>
        ))}
        {/* Loading indicator */}
        {loading && <LoadingSpinner />}
        {/* End of content message */}
        {!loading &&
          !hasMore &&
          postings.length > 0 && (
            <div className="text-center py-4 text-gray-500">
              You've reached the end of the content
            </div>
          )}
        <h1 className="text-xl lg:text-2xl font-bold mb-4 mt-3 font-fraunces">
          Happening Near You
        </h1>

        {communityEvents &&
          communityEvents.map((event, index) => (
            <HappeningCard
              key={event.id || index}
              image="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
              imageAlt="Gender Reveal Party"
              category={{
                name: "Community",
                icon: "👨‍👩‍👧‍👦",
                bgColor: "bg-blue-100",
                textColor: "text-blue-800"
              }}
              title={event.name}
              description={event.description}
              time={event.time}
              location={event.location}
              date={convertDateToObject(event.date)}
              isMobile={false}
              onGetDirection={() =>
                console.log("Get direction clicked for Gender Reveal Party")
              }
            />
          ))}
      </>
    );
  };

  return (
    <MainLayout rightSidebar={!isMobile ? <HomeRightSidebar /> : null}>
      {renderHomeContent()}
    </MainLayout>
  );
}

export default HomePage2;
