import { useIsMobile } from "../hooks/use-mobile";
import Header from "../components/discover_components/Header";
import TabNavigation from "../components/discover_components/TabNavigation";
import MainLayout from "../components/MainLayout";
import ContentView from "../components/discover_components/ContentView";
import { tabs } from "../components/discover_components/data/tabs-data";
import { useState, useEffect } from "react";
import { googleMapHandler } from "../services/googlemap";

const DiscoverPage = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("Restaurants");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [currentMile, setCurrentMile] = useState(5);
  const [loading, setLoading] = useState(true);

  const currentCategory = tabs.find((tab) => tab.title === activeTab);
  console.log(currentCategory, "current category");

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

  console.log(location, "locations", currentCategory, "currentCategory");

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

        console.log(data, "Places API response");
        setResults(data.results || []);
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError("Something went wrong while fetching places.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [location, activeTab, currentMile]);

  console.log(results, "results");

  return (
    <MainLayout rs={false}>
      <Header />
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <ContentView activeTab={activeTab} results={results} loading={loading} />
    </MainLayout>
  );
};

export default DiscoverPage;
