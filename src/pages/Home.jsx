// "use client";

// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { Menu } from "react-feather"; // Using react-feather instead of lucide-react
// import { useIsMobile } from "../hooks/use-mobile";
// import { TabbedContent } from "../components/home_components/tabbed-content";
// import HoroscopeCard from "../components/home_components/HoroscopeCard";
// import AllergyCard from "../components/home_components/AllergyCard";
// import WeatherCard from "../components/home_components/WeatherCard";
// import PromotionCard from "../components/home_components/PromotionCard";
// import PromotionCardLight from "../components/home_components/PromotionCardLight";
// import SocialPostCard from "../components/home_components/SocialPostCard";
// import NotificationCard from "../components/home_components/NotificationCard";
// import HomePromotionCard from "../components/home_components/HomePromotionCard";
// import BottomNavbar from "../components/home_components/BottomNavBar";
// import MobileSidebar from "../components/home_components/MobileSidebar";
// import HappeningCard from "../components/home_components/HappeningCard";
// import LocationDisplay from "../components/home_components/Locations";

// import {
//   fetchMasterCities,
//   retrieveMasterCity,
// } from "../services/locationServices";
// import { fetchCommunityEvents } from "../services/events";
// import { convertDateToObject } from "../lib/utils";
// import { getPostings } from "../services/scoops";

// export default function HomePage() {
//   const [viewportHeight, setViewportHeight] = useState("100vh");
//   const [isFirstCardVisible, setIsFirstCardVisible] = useState(true);
//   const [isSecondCardVisible, setIsSecondCardVisible] = useState(false);
//   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
//   const isMobile = useIsMobile();
//   const [prevScrollPos, setPrevScrollPos] = useState(0);
//   const [isNavbarVisible, setIsNavbarVisible] = useState(true);

//   /* ---------------------- Social Media Posts Section ----------------------
//    * Fetches and displays the 5 most recent social media posts
//    * Uses the getPostings service to retrieve posts based on geohash location
//    */
//   const [postings, setPostings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch the 5 most recent posts from the API
//   const fetchPosts = async () => {
//     setLoading(true);
//     setError(null);

//     const geohash = localStorage.getItem("geohash") || "9v6m";
//     const requestBody = { geohash, offset: 0 };

//     try {
//       const response = await getPostings(requestBody);
//       setPostings((response.posts || []).slice(0, 5)); // Only take the first 5 posts
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ??
//         error.data?.message ??
//         error.message ??
//         error;
//       setError(errorMessage);

//       toast.error("" + errorMessage, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   // Function to handle close button click
//   const handleCloseClick = () => {
//     setIsFirstCardVisible(false);
//     setIsSecondCardVisible(true);
//   };

//   // Update viewport height on resize and initial load
//   useEffect(() => {
//     const updateViewportHeight = () => {
//       setViewportHeight(`${window.innerHeight}px`);
//     };

//     // Set initial height
//     updateViewportHeight();

//     // Add resize listener
//     window.addEventListener("resize", updateViewportHeight);

//     // Cleanup
//     return () => window.removeEventListener("resize", updateViewportHeight);
//   }, []);

//   // Add this new useEffect for scroll handling in the mobile view
//   useEffect(() => {
//     if (!isMobile) return;

//     const handleScroll = () => {
//       const currentScrollPos = window.pageYOffset;

//       // Determine if we should show or hide based on scroll direction
//       // Also, don't hide navbar when at the top of the page
//       const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

//       setPrevScrollPos(currentScrollPos);
//       setIsNavbarVisible(visible);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [prevScrollPos, isMobile]);

//   /* ---------------------- Retrieving All Master Cities --------------------*/
//   const [masterCities, setMasterCities] = useState([]);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState({
//     state: "",
//     city: "",
//   });
//   const [communityEvents, setCommunityEvents] = useState([]);
//   useEffect(() => {
//     async function fetchMasterCity() {
//       try {
//         if (isProcessing) {
//           return;
//         }
//         setIsProcessing(true);
//         const citiesResponse = await fetchMasterCities();

//         setMasterCities(citiesResponse.data);
//       } catch (error) {
//         toast.error(
//           "" + (error.response?.data?.message ?? error.data?.message ?? error),
//           {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//           }
//         );
//       } finally {
//         setIsProcessing(false);
//       }
//     }
//     fetchMasterCity();
//   }, []);

//   // Getting Community Events around me
//   useEffect(() => {
//     async function fetchCommunityEvent() {
//       try {
//         setIsProcessing(true);
//         const eventsResponse = await fetchCommunityEvents({
//           state: "Texas",
//           city: "Austin",
//         });
//         setCommunityEvents(eventsResponse.data);
//       } catch (error) {
//         toast.error(
//           "" + (error.response?.data?.message ?? error.data?.message ?? error),
//           {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//           }
//         );
//       } finally {
//         setIsProcessing(false);
//       }
//     }
//     fetchCommunityEvent();
//   }, []);

//   async function handleLocationChange() {
//     // Normally wont be 0.0 but we only want it to changed based on dropdown data
//     const payload = {
//       latitude: 0.0,
//       longitude: 0.0,
//       city: selectedLocation.city,
//       state: selectedLocation.state,
//     };
//     try {
//       if (isProcessing) {
//         return;
//       }
//       setIsProcessing(true);
//       const cityResponse = await retrieveMasterCity(payload);
//       localStorage.setItem("geohash", cityResponse.geohash[0].geohash);
//       setMasterCities(cityResponse.geohash[0]);
//     } catch (error) {
//       toast.error(
//         "" + (error.response?.data?.message ?? error.data?.message ?? error),
//         {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//         }
//       );
//     } finally {
//       setIsProcessing(false);
//     }
//   }
//   /* ----------------------- Location Service end ----------------------_*/

//   // Loading spinner component
//   const LoadingSpinner = () => (
//     <div className="flex justify-center items-center py-4">
//       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700" />
//     </div>
//   );

//   /* ---------------------- Mobile Layout ----------------------
//    * Responsive design for mobile devices
//    * Includes header, main content sections, and bottom navigation
//    */
//   if (isMobile) {
//     return (
//       <div className="min-h-screen bg-gray-50 font-afacad">
//         {/* Mobile Header */}
//         <header className="top-0 left-0 right-0  z-30 border-b ">
//           <div className="flex items-center p-4">
//             <button
//               onClick={() => setIsMobileSidebarOpen(true)}
//               className="mr-3"
//             >
//               <Menu className="h-6 w-6" />
//             </button>

//             <div className="p-4">
//               <div className="flex items-center">
//                 <img
//                   src="/images/ping-desi-logo.png"
//                   alt="Ping Desi logo"
//                   width={20}
//                   height={20}
//                   className="object-contain mr-2"
//                 />

//                 <div>
//                   <div className="font-semibold text-[#7B189F]">Ping Desi</div>
//                   <div className="text-sm text-gray-700">
//                     <LocationDisplay />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Mobile Main Content */}
//         <main className="pt-6 pb-20">
//           <div className="p-4">
//             {/* First Card - Initially visible with close button */}
//             {isFirstCardVisible && (
//               <NotificationCard
//                 onClose={handleCloseClick}
//                 isMobile={isMobile}
//               />
//             )}

//             {/* Second Card - Initially invisible, appears when first card is closed */}
//             {isSecondCardVisible && <HomePromotionCard />}

//             <TabbedContent />

//             <section className="mb-6">
//               <div className="flex justify-between items-center mb-3">
//                 <h2 className="text-xl font-semibold font-frances">
//                   Local Buzz
//                 </h2>
//                 <a href="#" className="text-sm text-gray-600 flex items-center">
//                   Explore More <span className="ml-1">→</span>
//                 </a>
//               </div>
//               <div className="overflow-x-auto pb-2 ">
//                 <div className="flex space-x-4">
//                   <div className="bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0">
//                     <div className="relative h-32 w-full">
//                       <img
//                         src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
//                         alt="Farmers Market"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="p-3">
//                       <div className="flex items-center mb-1">
//                         <div className="h-5 w-5 bg-purple-600 rounded flex items-center justify-center mr-1.5">
//                           <span className="text-white text-xs">V</span>
//                         </div>
//                         <span className="text-xs text-gray-500">The Verge</span>
//                       </div>
//                       <h3 className="font-medium text-sm leading-tight">
//                         Local Farmers' Market Extends Weekly Hours
//                       </h3>
//                     </div>
//                   </div>

//                   <div className="bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0">
//                     <div className="relative h-32 w-full">
//                       <img
//                         src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
//                         alt="Festival Float"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="p-3">
//                       <div className="flex items-center mb-1">
//                         <div className="h-5 w-5 bg-black rounded flex items-center justify-center mr-1.5">
//                           <span className="text-white text-xs">T</span>
//                         </div>
//                         <span className="text-xs text-gray-500">
//                           The New York Times
//                         </span>
//                       </div>
//                       <h3 className="font-medium text-sm leading-tight">
//                         Road Closures Announced for Upcoming Festival
//                       </h3>
//                     </div>
//                   </div>

//                   <div className="bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0">
//                     <div className="relative h-32 w-full">
//                       <img
//                         src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
//                         alt="Farmers Market"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="p-3">
//                       <div className="flex items-center mb-1">
//                         <div className="h-5 w-5 bg-purple-600 rounded flex items-center justify-center mr-1.5">
//                           <span className="text-white text-xs">V</span>
//                         </div>
//                         <span className="text-xs text-gray-500">The Verge</span>
//                       </div>
//                       <h3 className="font-medium text-sm leading-tight">
//                         Local Farmers' Market Extends Weekly Hours
//                       </h3>
//                     </div>
//                   </div>

//                   <div className="bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0">
//                     <div className="relative h-32 w-full">
//                       <img
//                         src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
//                         alt="Festival Float"
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                     <div className="p-3">
//                       <div className="flex items-center mb-1">
//                         <div className="h-5 w-5 bg-black rounded flex items-center justify-center mr-1.5">
//                           <span className="text-white text-xs">T</span>
//                         </div>
//                         <span className="text-xs text-gray-500">
//                           The New York Times
//                         </span>
//                       </div>
//                       <h3 className="font-medium text-sm leading-tight">
//                         Road Closures Announced for Upcoming Festival
//                       </h3>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>
//             <PromotionCard />

//             <section className="mb-8">
//               <div className="flex justify-between items-center mb-3">
//                 <h2 className="text-xl font-semibold font-fraunces">
//                   Scoops Around You
//                 </h2>
//                 <a href="#" className="text-xs text-gray-600 flex items-center">
//                   View all <span className="ml-1">→</span>
//                 </a>
//               </div>
//               {/* Display up to 5 social media posts in a scrollable container */}
//               {/* Social Post */}
//               <div className="overflow-x-auto ">
//                 <div className="flex space-x-4">
//                   {postings.map((post, index) => (
//                     <div
//                       key={post.id || post._id || index}
//                       className="min-w-full"
//                     >
//                       <SocialPostCard post={post} isMobile={isMobile} />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               {loading && <LoadingSpinner />}
//             </section>

//             <section className="mb-6">
//               <div className="flex justify-between items-center mb-3">
//                 <h2 className="text-xl font-semibold font-fraunces">
//                   Happening Near You
//                 </h2>
//                 <a href="#" className="text-xs text-gray-600 flex items-center">
//                   View all <span className="ml-1">→</span>
//                 </a>
//               </div>
//               {/* Happening cards*/}
//               <div className="overflow-x-auto pb-2">
//                 <div
//                   className="flex space-x-4"
//                   style={{ minWidth: "min-content" }}
//                 >
//                   {communityEvents &&
//                     communityEvents.map((event, index) => (
//                       <HappeningCard
//                         key={event.id || index}
//                         image="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
//                         imageAlt="Gender Reveal Party"
//                         category={{
//                           name: "Community",
//                           icon: "👨‍👩‍👧‍👦",
//                           bgColor: "bg-blue-100",
//                           textColor: "text-blue-800",
//                         }}
//                         title={event.name}
//                         description={event.description}
//                         time={event.time}
//                         location={event.description}
//                         date={convertDateToObject(event.date)}
//                         isMobile={true}
//                         onGetDirection={() =>
//                           console.log(
//                             "Get direction clicked for Gender Reveal Party"
//                           )
//                         }
//                       />
//                     ))}
//                 </div>
//               </div>
//             </section>

//             <section className="mb-6">
//               <div className="flex justify-between items-center mb-3">
//                 <h2 className="text-xl font-semibold font-fraunces">
//                   Just for You
//                 </h2>
//                 <a href="#" className="text-xs text-gray-600 flex items-center">
//                   View all <span className="ml-1">→</span>
//                 </a>
//               </div>
//               {/* Just for you cards*/}
//               <div className="relative">
//                 <div className="bg-[#f5f0e8] rounded-lg shadow-sm overflow-hidden">
//                   <div className="p-4 flex items-center">
//                     <div className="w-1/3">
//                       <img
//                         src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
//                         alt="VR Headset"
//                         className="w-full h-auto object-cover"
//                       />
//                     </div>
//                     <div className="w-2/3 pl-4">
//                       <div className="text-red-500 text-xs font-medium mb-1">
//                         LIMITED SALE
//                       </div>
//                       <h3 className="font-bold text-gray-800 text-sm leading-tight mb-4">
//                         EXPERIENCE THE SENSATION OF VIRTUAL REALITY.
//                       </h3>
//                       <div className="flex justify-end">
//                         <button className="text-xs bg-transparent text-gray-700 font-medium">
//                           View Deals
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex justify-center py-2">
//                   <div className="flex space-x-1">
//                     <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
//                     <div className="h-1.5 w-1.5 rounded-full bg-purple-600" />
//                     <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </main>

//         {/* Mobile Bottom Navigation */}
//         <BottomNavbar isNavbarVisible={isNavbarVisible} />

//         {/* Mobile Sidebar */}
//         <MobileSidebar
//           isMobileSidebarOpen={isMobileSidebarOpen}
//           onClose={() => setIsMobileSidebarOpen(false)}
//         />
//       </div>
//     );
//   }

//   /* ---------------------- Desktop Layout ----------------------
//    * Three-column layout for desktop screens
//    * Left sidebar: Navigation menu
//    * Middle: Main content with posts and events
//    * Right sidebar: Weather, horoscope, and local news
//    */
//   // Desktop layout (original code)
//   return (
//     <div className="flex justify-center w-full bg-pink-50 font-afacad ">
//       {/* Main container with max-width for large screens */}
//       <div className="grid grid-cols-12 w-full max-w-[1600px] bg-white">
//         {/* Left Sidebar - 20% width (spans 2.4/12 columns) */}
//         <aside
//           className="col-span-4 lg:col-span-2 xl:col-span-2 border-r  font-afacad"
//           style={{
//             height: viewportHeight,
//             position: "sticky",
//             top: 0,
//             overflowY: "auto",
//             background:
//               "linear-gradient(to bottom, #ffe9f3, #ffe1e9, #ffc8ce, #ffd7e6)",
//           }}
//         >
//           <div className="flex flex-col h-full">
//             {/* Location Header */}
//             <div className="p-4 border-b">
//               <div className="flex items-center">
//                 <img
//                   src="/images/ping-desi-logo.png"
//                   alt="Ping Desi logo"
//                   width={20}
//                   height={20}
//                   className="object-contain mr-2"
//                 />

//                 <div>
//                   <div className="font-semibold text-[#7B189F]">Ping Desi</div>
//                   <div className="text-sm text-gray-700">
//                     <LocationDisplay />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Navigation Menu */}
//             <nav className="flex-1 py-4">
//               <div className="space-y-1 px-3">
//                 <a
//                   href="#"
//                   className="flex items-center gap-3 text-sm py-2 px-3 rounded-md bg-white"
//                 >
//                   <img
//                     src={"/images/home_icon.svg"}
//                     alt="Home icon"
//                     className="w-5 h-5"
//                   />

//                   <span>Home</span>
//                 </a>
//                 <a
//                   href="#"
//                   className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
//                 >
//                   <img
//                     src={"/images/search_icon.svg"}
//                     alt="Discover icon"
//                     className="w-5 h-5"
//                   />

//                   <span>Discover</span>
//                 </a>
//                 <a
//                   href="#"
//                   className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
//                 >
//                   <img
//                     src={"/images/scoops_icon.svg"}
//                     alt="scoops icon"
//                     className="w-5 h-5"
//                   />

//                   <span>Scoops</span>
//                 </a>
//                 <a
//                   href="#"
//                   className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
//                 >
//                   <img
//                     src={"/images/classfields_icon.svg"}
//                     alt="classfields icon"
//                     className="w-5 h-5"
//                   />

//                   <span>Classifieds</span>
//                 </a>
//                 <a
//                   href="#"
//                   className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
//                 >
//                   <img
//                     src={"/images/profile_icon.svg"}
//                     alt="profile icon"
//                     className="w-5 h-5"
//                   />

//                   <span>Profile</span>
//                 </a>
//                 <a
//                   href="#"
//                   className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-white"
//                 >
//                   <img
//                     src={"/images/more_icon.svg"}
//                     alt="more icon"
//                     className="w-5 h-5"
//                   />

//                   <span>More</span>
//                 </a>
//               </div>
//             </nav>
//             <PromotionCardLight />
//           </div>
//         </aside>

//         {/* Middle Content Area - 50% width (spans 6/12 columns) */}
//         <main className="col-span-8 lg:col-span-6 xl:col-span-6 overflow-y-auto border-gray-200">
//           <div className="p-4 lg:p-6 max-w-5xl mx-auto">
//             {/* First Card - Initially visible with close button */}
//             {isFirstCardVisible && (
//               <NotificationCard onClose={handleCloseClick} />
//             )}
//             {/* Second Card - Initially invisible, appears when first card is closed */}
//             {isSecondCardVisible && <HomePromotionCard />}
//             <h1 className="text-xl lg:text-2xl font-bold mb-4 mt-3 font-fraunces">
//               Scoops Around You
//             </h1>

//             {/* Display up to 5 social media posts in a scrollable container */}
//             {/* Social Posts - Limited to 5 */}
//             {postings.map((post, index) => (
//               <div key={post.id || post._id || index}>
//                 <SocialPostCard
//                   post={post}
//                   username={post.username}
//                   images={post.photopath ? post.photopath.split(",") : []}
//                 />
//               </div>
//             ))}
//             {/* Loading indicator */}
//             {loading && <LoadingSpinner />}

//             <h1 className="text-xl lg:text-2xl font-bold mb-4 mt-3 font-fraunces">
//               Happening Near You
//             </h1>

//             {communityEvents &&
//               communityEvents.map((event, index) => (
//                 <HappeningCard
//                   key={event.id || index}
//                   image="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
//                   imageAlt="Gender Reveal Party"
//                   category={{
//                     name: "Community",
//                     icon: "👨‍👩‍👧‍👦",
//                     bgColor: "bg-blue-100",
//                     textColor: "text-blue-800",
//                   }}
//                   title={event.name}
//                   description={event.description}
//                   time={event.time}
//                   location={event.location}
//                   date={convertDateToObject(event.date)}
//                   isMobile={false}
//                   onGetDirection={() =>
//                     console.log("Get direction clicked for Gender Reveal Party")
//                   }
//                 />
//               ))}
//           </div>
//         </main>

//         {/* Right Sidebar - 30% width (spans 3.6/12 columns) */}
//         <aside className="col-span-0 lg:col-span-4 xl:col-span-4 hidden lg:block border-l-2 border-gray-100 overflow-y-auto h-fit">
//           <div className="p-5 flex flex-col">
//             {/* Header section */}
//             <div className="mb-2">
//               <div className="text-gray-500 text-sm mb-1">Thursday, 30 Jan</div>
//               <h2 className="text-xl font-bold font-fraunces">
//                 <span>Today's </span>
//                 <span className=" ">Forecast</span>
//               </h2>
//             </div>

//             {/* Cards container with flex layout and fixed gap */}
//             <div className="flex flex-col gap-[10px] mt-2">
//               <WeatherCard />

//               <AllergyCard />

//               <HoroscopeCard />

//               {/* Divider */}
//               <div className="w-full h-px bg-gray-200 my-4" />
//               <div className="mb-2">
//                 <h2 className="text-xl font-bold font-fraunces">
//                   <span>Local </span>
//                   <span>Buzz</span>
//                 </h2>
//               </div>
//               {/* Top Local Buzz Section */}
//               <div className="w-[99%] mx-auto bg-white p-4 overflow-hidden font-afacad">
//                 <div className="space-y-5">
//                   {/* The Verge News */}
//                   <div className="flex items-start">
//                     <div className="h-8 w-8 bg-purple-600 rounded flex items-center justify-center mr-3 flex-shrink-0">
//                       <span className="text-white text-xs">V</span>
//                     </div>
//                     <div>
//                       <div className="text-sm text-gray-500">The Verge</div>
//                       <h4 className="font-medium">
//                         Local Farmers' Market Extends Weekly Hours
//                       </h4>
//                     </div>
//                   </div>

//                   {/* The New York Times News */}
//                   <div className="flex items-start">
//                     <div className="h-8 w-8 bg-black rounded flex items-center justify-center mr-3 flex-shrink-0">
//                       <span className="text-white text-xs">T</span>
//                     </div>
//                     <div>
//                       <div className="text-sm text-gray-500">
//                         The New York Times
//                       </div>
//                       <h4 className="font-medium">
//                         Road Closures Announced for Upcoming Festival
//                       </h4>
//                     </div>
//                   </div>

//                   {/* The Guardian News */}
//                   <div className="flex items-start">
//                     <div className="h-8 w-8 bg-blue-800 rounded flex items-center justify-center mr-3 flex-shrink-0">
//                       <span className="text-white text-xs">G</span>
//                     </div>
//                     <div>
//                       <div className="text-sm text-gray-500">The Guardian</div>
//                       <h4 className="font-medium">
//                         City Council Approves Affordable Housing Project
//                       </h4>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }
