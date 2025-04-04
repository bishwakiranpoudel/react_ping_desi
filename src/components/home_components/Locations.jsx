"use client";

import { useEffect, useState } from "react";

export default function LocationDisplay() {
  const [locationText, setLocationText] = useState(
    "Determining your location..."
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    // Get current position
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Use OpenStreetMap's Nominatim API for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
              headers: {
                "Accept-Language": "en-US,en;q=0.9",
                "User-Agent": "LocationDisplayComponent",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch address");
          }

          const data = await response.json();

          // Format the address in the desired way
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.county ||
            "Unknown City";

          const street =
            data.address.road ||
            data.address.street ||
            data.address.pedestrian ||
            data.address.state ||
            "Unknown Street";

          setLocationText(`${city}, ${street}`);
        } catch (err) {
          setError("Error fetching location details");
        }
      },
      (err) => {
        switch (err.code) {
          case 1:
            setError(
              "Location access denied. Please enable location services."
            );
            break;
          case 2:
            setError("Location unavailable. Please try again later.");
            break;
          case 3:
            setError("Location request timed out. Please try again.");
            break;
          default:
            setError("An unknown error occurred while getting your location.");
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }, []);

  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }

  return <div className="text-sm text-gray-700">{locationText}</div>;
}
