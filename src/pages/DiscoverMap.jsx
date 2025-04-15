import { useIsMobile } from "../hooks/use-mobile";
import Header from "../components/discover_components/Header";
import TabNavigation from "../components/discover_components/TabNavigation";
import MainLayout from "../components/MainLayout";
import ContentView from "../components/discover_components/ContentView";
import { tabs } from "../components/discover_components/data/tabs-data";
import { useState, useEffect } from "react";
import { googleMapHandler } from "../services/googlemap";
import { toast } from "react-toastify";

const DiscoverMap = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("Restaurants");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [currentMile, setCurrentMile] = useState(5);
  const [loading, setLoading] = useState(true);

  const currentCategory = tabs.find((tab) => tab.title === activeTab);

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

  return (
    <MainLayout rs={false}>
      <Header />
    </MainLayout>
  );
};

export default DiscoverMap;
