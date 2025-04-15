"use client";

import { useIsMobile } from "../hooks/use-mobile";
import TabNavigation from "../components/discover_components/TabNavigation";
import MainLayout from "../components/MainLayout";
import ContentView from "../components/discover_components/ContentView";
import { tabs } from "../components/discover_components/data/tabs-data";
import { useState, useEffect, useRef } from "react";
import { googleMapHandler, googleMapImageHandler } from "../services/googlemap";
import { toast } from "react-toastify";
import { XCircle, Navigation, MapPin, List, Map } from "lucide-react";

// Google Maps Script Loader Component
const GoogleMapsScript = ({ apiKey }) => {
  useEffect(() => {
    // Check if script is already loaded
    if (window.google) return;

    // Create script element
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    // Append script to document
    document.head.appendChild(script);

    // Clean up
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [apiKey]);

  return null;
};
const apiKey = process.env.REACT_APP_GOOGLEMAP_API;

// Get category icon based on place type or category
const getCategoryIcon = (category) => {
  const iconMap = {
    Restaurants: "🍽️",
    Cafes: "☕",
    Bars: "🍸",
    Shopping: "🛍️",
    Entertainment: "🎭",
    Parks: "🌳",
    Gyms: "💪",
    Beauty: "💇",
    Hotels: "🏨",
    default: "🏪",
    Groceries: "🛒",
    Professionals: "👔",
    SmallBusiness: "🏪",
  };

  return iconMap[category] || iconMap.default;
};

// Custom InfoWindow Content
const createInfoWindowContent = (place, category) => {
  const categoryIcon = getCategoryIcon(category);

  return `
<div class="relative">
  <div class="w-10 h-10 bg-[#7b189f] rounded-lg flex items-center justify-center text-white shadow-md cursor-pointer">
    <span class="flex items-center justify-center w-full h-full text-2xl leading-none">
      ${categoryIcon}
    </span>
  </div>
</div>
  `;
};

const DiscoverPage = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("Restaurants");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [resultsWithDistance, setResultsWithDistance] = useState([]);
  const [resultsWithDistanceAndImages, setResultsWithDistanceAndImages] =
    useState([]);
  const [tryNewPlaces, setTryNewPlaces] = useState([]);
  const [currentMile, setCurrentMile] = useState(5);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("list"); // "list" or "map"

  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowsRef = useRef([]);
  const activeInfoWindowRef = useRef(null);

  const currentCategory = tabs.find((tab) => tab.title === activeTab);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 3958.8; // Radius of the Earth in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in miles
    return distance.toFixed(1);
  };

  const extractTryNewPlaces = (places) => {
    if (!places || places.length === 0) return [];

    // Find places that are well-rated but not too popular (hidden gems)
    const potentialNewPlaces = places.filter(
      (place) =>
        place.rating &&
        place.rating >= 4.0 &&
        place.user_ratings_total &&
        place.user_ratings_total < 150
    );

    // Sort by a combination of rating and distance
    const sortedPlaces = [...potentialNewPlaces].sort((a, b) => {
      // Create a score based on rating and distance
      const scoreA = a.rating * 2 - Number.parseFloat(a.distance) * 0.1;
      const scoreB = b.rating * 2 - Number.parseFloat(b.distance) * 0.1;
      return scoreB - scoreA; // Higher score first
    });

    return sortedPlaces.slice(0, 8); // Limit to 8 places
  };

  // This function adds both distance and images to places
  const processPlacesWithDistanceAndImages = async (places, userLocation) => {
    if (!places || places.length === 0) return [];

    // First add distance to all places
    const placesWithDistance = places.map((place) => {
      const placeLat = place.geometry.location.lat;
      const placeLng = place.geometry.location.lng;

      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        placeLat,
        placeLng
      );

      return {
        ...place,
        distance,
      };
    });

    // Then fetch and add images for all places
    const placesWithDistanceAndImages = await Promise.all(
      placesWithDistance.map(async (place) => {
        if (place.photos && place.photos.length > 0) {
          try {
            const photoReference = place.photos[0].photo_reference;
            const imageData = await googleMapImageHandler({
              photo_reference: photoReference,
              maxwidth: 400,
            });

            return {
              ...place,
              imageUrl: imageData || null,
            };
          } catch (error) {
            console.error(`Error fetching image for ${place.name}:`, error);
            return {
              ...place,
              imageUrl: null,
            };
          }
        } else {
          return {
            ...place,
            imageUrl: null,
          };
        }
      })
    );

    return placesWithDistanceAndImages;
  };

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (err) => {
            setError("Please enable location services.");
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported.");
        setLoading(false);
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (!location || !currentCategory) return;
      setLoading(true);
      try {
        const data = await googleMapHandler({
          latitude: location.latitude,
          longitude: location.longitude,
          radius: currentMile * 1.6 * 1000,
          type: currentCategory.type,
          keyword: currentCategory.keyword,
        });
        console.log(data, "results");

        setResults(data.results || []);
      } catch (err) {
        console.error("Fetch error:", err.message);
        toast.error("Something went wrong while fetching places.");
        setError("Something went wrong while fetching places.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [location, activeTab, currentMile]);

  useEffect(() => {
    const processResults = async () => {
      if (results.length > 0 && location) {
        setLoading(true);
        try {
          // First, set basic distance data for map view
          const basicPlacesWithDistance = results.map((place) => {
            const placeLat = place.geometry.location.lat;
            const placeLng = place.geometry.location.lng;

            const distance = calculateDistance(
              location.latitude,
              location.longitude,
              placeLat,
              placeLng
            );

            return {
              ...place,
              distance,
            };
          });

          // Update resultsWithDistance for map view
          setResultsWithDistance(basicPlacesWithDistance);

          // Process all places to add distance and images for list view
          const processedPlaces = await processPlacesWithDistanceAndImages(
            results,
            location
          );

          // Extract try new places from processed places
          const newPlaces = extractTryNewPlaces(processedPlaces);

          setResultsWithDistanceAndImages(processedPlaces);
          setTryNewPlaces(newPlaces);
        } catch (error) {
          console.error("Error processing places:", error);
          toast.error("Error loading place details");
        } finally {
          setLoading(false);
        }
      } else {
        setResultsWithDistance([]);
        setResultsWithDistanceAndImages([]);
        setTryNewPlaces([]);
      }
    };

    processResults();
  }, [results, location]);

  // Initialize Google Map
  useEffect(() => {
    if (viewMode !== "map" || !location || !window.google || !mapRef.current)
      return;

    // Clear previous markers and infowindows
    if (markersRef.current.length > 0) {
      markersRef.current.forEach((item) => item.marker.setMap(null));
      markersRef.current = [];
    }

    if (infoWindowsRef.current.length > 0) {
      infoWindowsRef.current.forEach((infoWindow) => infoWindow.close());
      infoWindowsRef.current = [];
    }

    // Initialize map
    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: location.latitude, lng: location.longitude },
      zoom: 14,
      disableDefaultUI: isMobile, // Simplify UI on mobile
      zoomControl: !isMobile,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: !isMobile,
    });

    googleMapRef.current = googleMap;

    // Add user location marker
    new window.google.maps.Marker({
      position: { lat: location.latitude, lng: location.longitude },
      map: googleMap,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: "#4285F4",
        fillOpacity: 1,
        strokeColor: "#FFFFFF",
        strokeWeight: 2,
      },
      title: "Your Location",
    });

    // Add markers and info windows for all places
    resultsWithDistance.forEach((place) => {
      // Create marker with category icon
      const marker = new window.google.maps.Marker({
        position: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        },
        map: googleMap,
        title: place.name,
        // Use visible marker with custom icon
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
  <rect 
    x="0" y="0" 
    width="36" height="36" 
    rx="8" ry="8" 
    fill="%237b189f" 
    opacity="${
      selectedPlace && selectedPlace.place_id === place.place_id ? "1" : "1"
    }" 
    stroke="${
      selectedPlace && selectedPlace.place_id === place.place_id
        ? "black "
        : "none"
    }" 
    strokeWidth="${
      selectedPlace && selectedPlace.place_id === place.place_id ? "2" : "0"
    }"
  />
  <text 
    x="50%" 
    y="50%" 
    fontSize="18" 
    textAnchor="middle" 
    alignmentBaseline="central" 
    fill="white"
  >
    ${getCategoryIcon(activeTab)}
  </text>
</svg>`,
          scaledSize: new window.google.maps.Size(
            selectedPlace && selectedPlace.place_id === place.place_id
              ? 44
              : 36,
            selectedPlace && selectedPlace.place_id === place.place_id ? 44 : 36
          ),
          anchor: new window.google.maps.Point(
            selectedPlace && selectedPlace.place_id === place.place_id
              ? 22
              : 18,
            selectedPlace && selectedPlace.place_id === place.place_id ? 22 : 18
          ),
        },
        opacity: 1, // Start with full opacity
      });

      // Add to refs for cleanup with place_id for identification
      markersRef.current.push({
        marker,
        place_id: place.place_id,
      });

      // Add click listener to marker
      marker.addListener("click", () => {
        // Center map on the clicked marker
        googleMap.panTo({
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        });

        // Set the selected place
        setSelectedPlace(place);

        // Update all markers to show active/inactive state
        markersRef.current.forEach((item) => {
          const isActive = place.place_id === item.place_id;
          item.marker.setIcon({
            url: `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
  <circle cx="18" cy="18" r="${isActive ? "22" : "16"}" fill="${
              isActive ? "%237b189f" : "white"
            }" opacity="1" stroke="${
              isActive ? "white" : "%237b189f"
            }" strokeWidth="${isActive ? "2" : "0"}"/>
  <text 
    x="50%" 
    y="50%" 
    fontSize="${isActive ? "20" : "18"}" 
    textAnchor="middle" 
    alignmentBaseline="central" 
    fill="white"
  >
    ${getCategoryIcon(activeTab)}
  </text>
</svg>`,
            scaledSize: new window.google.maps.Size(
              isActive ? 44 : 36,
              isActive ? 44 : 36
            ),
            anchor: new window.google.maps.Point(
              isActive ? 22 : 18,
              isActive ? 22 : 18
            ),
          });
          item.marker.setZIndex(isActive ? 999 : 1); // Bring active marker to front
        });
      });

      // Create info window with custom content
      const infoWindow = new window.google.maps.InfoWindow({
        content: createInfoWindowContent(place, activeTab),
        disableAutoPan: true,
      });

      // Add to refs for cleanup
      infoWindowsRef.current.push(infoWindow);
    });

    // Add map click listener to close info windows when clicking elsewhere on the map
    googleMap.addListener("click", (e) => {
      // Check if the click is on a marker
      let clickedOnMarker = false;
      for (const item of markersRef.current) {
        if (item.marker.getPosition().equals(e.latLng)) {
          clickedOnMarker = true;
          break;
        }
      }

      // Only close the detail view if not clicking on a marker
      if (!clickedOnMarker) {
        setSelectedPlace(null);

        // Reset all markers to full opacity
        markersRef.current.forEach((item) => {
          item.marker.setIcon({
            url: `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" fill="%237b189f" opacity="1" stroke="none" strokeWidth="0"/><text x="50%" y="52%" fontSize="18" textAnchor="middle" dominantBaseline="middle" fill="white">${getCategoryIcon(
              activeTab
            )}</text></svg>`,
            scaledSize: new window.google.maps.Size(36, 36),
            anchor: new window.google.maps.Point(18, 18),
          });
          item.marker.setZIndex(1);
        });
      }
    });
  }, [
    location,
    resultsWithDistance,
    isMobile,
    activeTab,
    selectedPlace,
    viewMode,
  ]);

  // Error display component
  const ErrorDisplay = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
      <div className="text-center p-4">
        <div className="text-red-500 text-xl mb-2">Error</div>
        <p className="text-gray-700">{error}</p>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    </div>
  );

  // Detailed place view when a place is selected
  const DetailedPlaceView = ({ place }) => {
    if (!place) return null;

    return (
      <div className="absolute bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-80 bg-white rounded-lg shadow-lg overflow-hidden animate-fadeIn">
        <div className="relative h-[180px] w-full">
          {place.photos && place.photos[0] ? (
            <img
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`}
              alt={place.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="/image/discover-list.png"
              alt={place.name}
              className="w-full h-full object-cover"
            />
          )}
          <button
            onClick={() => {
              setSelectedPlace(null);
              // Reset all markers to full opacity
              if (markersRef.current) {
                markersRef.current.forEach((item) => {
                  item.marker.setIcon({
                    url: `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><circle cx="18" cy="18" r="16" fill="%237b189f" opacity="1" stroke="none" strokeWidth="0"/><text x="50%" y="52%" fontSize="18" textAnchor="middle" dominantBaseline="middle" fill="white">${getCategoryIcon(
                      activeTab
                    )}</text></svg>`,
                    scaledSize: new window.google.maps.Size(36, 36),
                    anchor: new window.google.maps.Point(18, 18),
                  });
                  item.marker.setZIndex(1);
                });
              }
            }}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
          >
            <XCircle size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-medium text-gray-800 text-lg mb-1">
            {place.name}
          </h3>

          {place.vicinity && (
            <p className="text-gray-600 text-sm mb-3">{place.vicinity}</p>
          )}

          <div className="flex items-center mt-2 space-x-2 mb-3">
            <div className="flex items-center bg-purple-100 px-3 py-1 rounded-sm">
              <MapPin size={14} className="text-purple-700" />
              <span className="text-xs text-purple-700 ml-1">
                {place.distance} miles
              </span>
            </div>
            <div className="flex items-center bg-green-100 px-3 py-1 rounded-sm">
              <img
                src="/images/delivery.png"
                alt="Delivery"
                className="w-4 h-4"
              />
              <span className="text-xs text-green-700 ml-1">Free Delivery</span>
            </div>
          </div>

          {place.opening_hours && (
            <div className="mb-3">
              <span
                className={`text-sm ${
                  place.opening_hours.open_now
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {place.opening_hours.open_now ? "Open Now" : "Closed"}
              </span>
            </div>
          )}

          <div className="mt-4 flex space-x-2">
            <a
              href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-purple-700 text-white text-center py-2 rounded-md text-sm font-medium"
            >
              View Details
            </a>
            <button
              className="flex-1 border border-gray-300 text-gray-700 text-center py-2 rounded-md text-sm font-medium flex items-center justify-center gap-1"
              onClick={() => {
                window.open(
                  `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${place.geometry.location.lat},${place.geometry.location.lng}&destination_place_id=${place.place_id}`,
                  "_blank"
                );
              }}
            >
              <Navigation size={16} />
              Directions
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Toggle view button component
  const ToggleViewButton = () => (
    <button
      className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-1.5 bg-white"
      onClick={() => setViewMode(viewMode === "list" ? "map" : "list")}
    >
      <span className="text-sm">{viewMode === "list" ? "Map" : "List"}</span>
      {viewMode === "list" ? (
        <Map className="h-4 w-4" />
      ) : (
        <List className="h-4 w-4" />
      )}
    </button>
  );

  return (
    <MainLayout rs={false}>
      <GoogleMapsScript apiKey={apiKey} />
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 mr-4">
          <div className="relative w-full">
            <div className="relative rounded-full bg-white shadow-sm flex items-center px-4 py-2">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Nearby Indian restaurant, Roommates eat..."
                className="ml-2 flex-1 border-none outline-none bg-transparent text-sm text-gray-600"
              />
            </div>
          </div>
        </div>
        <ToggleViewButton />
      </div>
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {viewMode === "list" ? (
        <ContentView
          activeTab={activeTab}
          results={resultsWithDistanceAndImages}
          tryNewPlaces={tryNewPlaces}
          loading={loading}
          location={location}
        />
      ) : (
        <div className="relative h-[calc(100vh-120px)]">
          {error && <ErrorDisplay />}

          {/* Map Container */}
          <div ref={mapRef} className="h-full w-full" />

          {/* Loading Indicator */}
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 border-4 border-t-4 border-purple-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-lg">Loading places...</p>
              </div>
            </div>
          )}

          {/* Detailed Place View */}
          {selectedPlace && <DetailedPlaceView place={selectedPlace} />}
        </div>
      )}
    </MainLayout>
  );
};

export default DiscoverPage;
