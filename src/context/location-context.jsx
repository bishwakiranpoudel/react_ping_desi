"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LocationContext = createContext(undefined);

export function LocationProvider({ children }) {
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null,
    error: null,
    loading: true,
  });

  const requestLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocationData((prev) => ({
        ...prev,
        error: "Geolocation is not supported by your browser",
        loading: false,
      }));
      return;
    }

    setLocationData((prev) => ({ ...prev, loading: true }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (error) => {
        setLocationData({
          latitude: null,
          longitude: null,
          error: error.message,
          loading: false,
        });
      }
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      requestLocation();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LocationContext.Provider value={{ locationData, requestLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
