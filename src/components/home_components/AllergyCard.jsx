"use client";

import { Flower } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { handlePostRequest } from "../../hooks/api";

// Component for the circular icon with colored border
const AllergenIcon = ({ icon, borderColor, alt }) => (
  <div
    className="flex items-center justify-center rounded-full bg-none font-afacad w-25 h-25 p-2"
    style={{ border: `1px solid ${borderColor}` }}
  >
    <img
      src={icon || "/placeholder.svg"}
      alt={alt}
      className="object-contain"
    />
  </div>
);

// Component for each allergen item
const AllergenItem = ({ icon, name, category, color, alt, isLeft = false }) => {
  return (
    <div className="flex items-center gap-4 w-full ">
      {isLeft ? (
        <>
          <div className="flex items-center justify-end w-full">
            <div className="text-right">
              <div className="text-gray-700 text-lg font-medium">{name}</div>
              <div className="text-sm font-medium" style={{ color }}>
                {category}
              </div>
            </div>
            <div className="flex flex-shrink-0 ml-2">
              <AllergenIcon icon={icon} borderColor={color} alt={alt} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-shrink-0">
            <AllergenIcon icon={icon} borderColor={color} alt={alt} />
          </div>
          <div className="flex-grow">
            <div className="text-gray-700 text-lg font-medium">{name}</div>
            <div className="text-sm font-medium" style={{ color }}>
              {category}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Map category to color
const categoryToColor = {
  High: "#CA1C1E", // Red
  Moderate: "#E9B949", // Yellow
  Low: "#4EA737", // Green
};

// Map allergen name to icon path
const allergenToIcon = {
  "Tree Pollen": "/images/tree.svg",
  "Ragweed Pollen": "/images/Ragweed.svg",
  Mold: "/images/Moss.svg",
  "Grass Pollen": "/images/Grass.svg",
};

// Skeleton loader component for allergen items
const AllergenItemSkeleton = ({ isLeft = false }) => {
  return (
    <div className="flex items-center gap-4 w-full">
      {isLeft ? (
        <>
          <div className="flex items-center justify-end w-full">
            <div className="text-right">
              <div className="h-5 w-16 bg-gray-300 rounded animate-pulse mb-1"></div>
              <div className="h-4 w-14 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="flex flex-shrink-0 ml-2">
              <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse"></div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gray-300 animate-pulse"></div>
          </div>
          <div className="flex-grow">
            <div className="h-5 w-16 bg-gray-300 rounded animate-pulse mb-1"></div>
            <div className="h-4 w-14 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default function AllergyCard({
  backgroundImg = "/images/allergy_bg4.png",
  alertIcon = <Flower className="h-5 w-5 text-gray-800 mt-0.5" />,
}) {
  const [allergyData, setAllergyData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);

  const data = {
    lat: "30.2711286",
    lang: "-97.7436995",
    geohash: "9v6m",
  };

  useEffect(() => {
    const fetchAllergySummary = async () => {
      try {
        setIsProcessing(true);
        setError(null);

        const response = await handlePostRequest(
          "/news/allergySummary",
          data,
          {},
          false
        );

        setAllergyData(response);
      } catch (error) {
        setError(error.response?.data?.message ?? error.data?.message ?? error);
        toast.error("Error fetching allergy summary: " + error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      } finally {
        setIsProcessing(false);
      }
    };

    fetchAllergySummary();
  }, []);

  // Extract data
  const allergysummary = allergyData?.data?.allergysummary ?? "";
  const polleninfo = allergyData?.data?.polleninfo ?? [];
  const [title, description] = allergysummary.split("\n");

  // Create allergen items from API data
  const getAllergenItems = () => {
    if (!polleninfo || polleninfo.length === 0) {
      return [
        {
          icon: "/images/tree-icon.png",
          name: "Tree",
          category: "Low",
          alt: "Tree icon",
        },
        {
          icon: "/images/ragweed-icon.png",
          name: "Ragweed",
          category: "Medium",
          alt: "Ragweed icon",
        },
        {
          icon: "/images/mold-icon.png",
          name: "Mold",
          category: "Low",
          alt: "Mold icon",
        },
        {
          icon: "/images/grass-icon.png",
          name: "Grass",
          category: "High",
          alt: "Grass icon",
        },
      ];
    }

    return polleninfo.map((item) => ({
      icon: allergenToIcon[item.Name] || "/placeholder.svg",
      name: item.Name.replace(" Pollen", ""),
      category: item.Category,
      alt: `${item.Name} icon`,
    }));
  };

  const allergens = getAllergenItems();

  // Skeleton loader component
  const AllergyCardSkeleton = () => (
    <div className="max-w-md mx-auto">
      <div className="rounded-2xl overflow-hidden shadow-sm border">
        {/* Top section skeleton */}
        <div className="bg-gray-200 relative">
          <div className="grid grid-cols-2 justify-center items-center">
            {/* Top row */}
            <div className="p-2 pr-7 ml-auto flex flex-col items-center justify-center">
              <AllergenItemSkeleton isLeft={true} />
            </div>

            <div className="p-2 pl-7 flex flex-col items-center justify-center">
              <AllergenItemSkeleton />
            </div>

            {/* Horizontal Divider */}
            <div className="col-span-2 h-px w-[80%] bg-gray-300 mx-auto my-2" />

            {/* Bottom row */}
            <div className="p-2 pr-7 flex ml-auto flex-col items-center justify-center">
              <AllergenItemSkeleton isLeft={true} />
            </div>

            <div className="p-2 pl-7 flex flex-col items-center justify-center">
              <AllergenItemSkeleton />
            </div>
          </div>

          {/* Vertical Divider - Fixed positioning */}
          <div
            className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-px bg-gray-300"
            style={{ height: "100%" }}
          />
        </div>

        {/* Bottom section skeleton */}
        <div className="p-4 bg-white">
          <div className="flex items-start gap-2 mb-2">
            <div className="w-full">
              <div className="h-5 w-40 bg-gray-300 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-full bg-gray-300 rounded animate-pulse mb-1"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isProcessing) {
    return <AllergyCardSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-4 text-red-500">
        Error loading allergy data
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-2xl overflow-hidden shadow-sm border">
        {/* Top section with allergens */}
        <div className="relative">
          {/* Background Image with blur effect */}
          <div className="absolute inset-0">
            <div className="relative w-full h-full">
              <img
                src={backgroundImg || "/placeholder.svg"}
                alt="Textured background"
                className="object-cover w-full h-full absolute"
              />
              {/* Dark overlay with blur */}
              <div
                className="absolute inset-0"
                style={{
                  backdropFilter: "blur(2px)",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
              />
            </div>
          </div>

          {/* Grid layout with proper dividers */}
          <div className="relative z-10 grid grid-cols-2 justify-center items-center">
            {/* Top row */}
            <div className="p-2 pr-7 ml-auto flex flex-col items-center justify-center">
              <AllergenItem
                icon={allergens[0]?.icon}
                name={allergens[0]?.name}
                category={allergens[0]?.category}
                color={categoryToColor[allergens[0]?.category]}
                alt={allergens[0]?.alt}
                isLeft={true}
              />
            </div>

            <div className="p-2 pl-7 flex flex-col items-center justify-center">
              <AllergenItem
                icon={allergens[1]?.icon}
                name={allergens[1]?.name}
                category={allergens[1]?.category}
                color={categoryToColor[allergens[1]?.category]}
                alt={allergens[1]?.alt}
              />
            </div>

            {/* Horizontal Divider */}
            <div className="col-span-2 h-px w-[80%] bg-gray-300 mx-auto my-2" />

            {/* Bottom row */}
            <div className="p-2 pr-7 flex ml-auto flex-col items-center justify-center">
              <AllergenItem
                icon={allergens[2]?.icon}
                name={allergens[2]?.name}
                category={allergens[2]?.category}
                color={categoryToColor[allergens[2]?.category]}
                alt={allergens[2]?.alt}
                isLeft={true}
              />
            </div>

            <div className="p-2 pl-7 flex flex-col items-center justify-center">
              <AllergenItem
                icon={allergens[3]?.icon}
                name={allergens[3]?.name}
                category={allergens[3]?.category}
                color={categoryToColor[allergens[3]?.category]}
                alt={allergens[3]?.alt}
              />
            </div>

            {/* Vertical Divider */}
            <div
              className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-px bg-gray-300"
              style={{ height: "100%" }}
            />
          </div>
        </div>

        {/* Bottom section with alert */}
        <div className="p-4 bg-white">
          <div className="flex items-start gap-2 mb-2">
            <div>
              <div className="font-medium text-gray-800">
                {title || "Allergy Summary"}
              </div>
              <p className="text-gray-600 text-sm mt-1">
                {description || "Current allergy information for your area"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
