import { useIsMobile } from "../hooks/use-mobile";
import Header from "../components/discover_components/Header";
import TabNavigation from "../components/discover_components/TabNavigation";
import MainLayout from "../components/MainLayout";
import ContentView from "../components/discover_components/ContentView";
import { tabs } from "../components/discover_components/data/tabs-data";
import { useState, useEffect } from "react";
import { googleMapHandler, googleMapImageHandler } from "../services/googlemap";
import { toast } from "react-toastify";

const DiscoverPage = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("Restaurants");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [resultsWithDistanceAndImages, setResultsWithDistanceAndImages] =
    useState([]);
  const [tryNewPlaces, setTryNewPlaces] = useState([]);
  const [currentMile, setCurrentMile] = useState(5);
  const [loading, setLoading] = useState(true);

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
      const scoreA = a.rating * 2 - parseFloat(a.distance) * 0.1;
      const scoreB = b.rating * 2 - parseFloat(b.distance) * 0.1;
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
        console.log(place, "place");
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
          // Process all places to add distance and images
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
        setResultsWithDistanceAndImages([]);
        setTryNewPlaces([]);
      }
    };

    processResults();
  }, [results, location]);

  return (
    <MainLayout rs={false}>
      <Header />
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <ContentView
        activeTab={activeTab}
        results={resultsWithDistanceAndImages}
        tryNewPlaces={tryNewPlaces}
        loading={loading}
        location={location}
      />
    </MainLayout>
  );
};

export default DiscoverPage;
