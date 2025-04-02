import { Flower } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { handlePostRequest } from "../../hooks/api";

// Component for the circular icon with colored border
const AllergenIcon = ({ icon, borderColor, alt }) => (
  <div
    className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white font-afacad"
    style={{ border: `1px solid ${borderColor}` }}
  >
    <img
      src={icon || "/placeholder.svg"}
      alt={alt}
      width={20}
      height={20}
      className="object-contain"
    />
  </div>
);

// Component for each allergen item
const AllergenItem = ({ icon, name, category, color, alt }) => (
  <div className="flex flex-col items-center">
    <AllergenIcon icon={icon} borderColor={color} alt={alt} />
    <div className="mt-1 text-center">
      <div className="text-gray-700 text-sm font-medium">{name}</div>
      <div className="text-sm font-medium" style={{ color }}>
        {category}
      </div>
    </div>
  </div>
);

// Map category to color
const categoryToColor = {
  High: "#CA1C1E", // Red
  Moderate: "#E9B949", // Yellow
  Low: "#4EA737", // Green
};

// Map allergen name to icon path
const allergenToIcon = {
  "Tree Pollen": "/images/tree-icon.png",
  "Ragweed Pollen": "/images/ragweed-icon.png",
  Mold: "/images/mold-icon.png",
  "Grass Pollen": "/images/grass-icon.png",
};

export default function AllergyCard({
  backgroundImg = "/images/textured-bg.png",
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
        console.log(response, "Allergy Summary Response");

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
  const allergysummary = allergyData?.data.allergysummary ?? "";
  const polleninfo = allergyData?.data.polleninfo ?? [];
  const [title, description] = allergysummary.split("\n");
  console.log(polleninfo);

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

  if (isProcessing) {
    return <div className="max-w-md mx-auto p-4">Loading allergy data...</div>;
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
                src={backgroundImg}
                alt="Textured background"
                className="object-cover w-full h-full absolute"
              />
              {/* Dark overlay with blur */}
              <div
                className="absolute inset-0"
                style={{
                  backdropFilter: "blur(2px)",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                }}
              ></div>
            </div>
          </div>

          {/* Grid layout with proper dividers */}
          <div className="relative z-10 grid grid-cols-2 divide-x divide-gray-300">
            {/* Top row */}
            <div className="p-2 flex flex-col items-center justify-center">
              <AllergenItem
                icon={allergens[0]?.icon}
                name={allergens[0]?.name}
                category={allergens[0]?.category}
                color={categoryToColor[allergens[0]?.category]}
                alt={allergens[0]?.alt}
              />
            </div>

            <div className="p-2 flex flex-col items-center justify-center">
              <AllergenItem
                icon={allergens[1]?.icon}
                name={allergens[1]?.name}
                category={allergens[1]?.category}
                color={categoryToColor[allergens[1]?.category]}
                alt={allergens[1]?.alt}
              />
            </div>

            {/* Horizontal divider */}
            <div className="col-span-2 h-px bg-gray-300"></div>

            {/* Bottom row */}
            <div className="p-2 flex flex-col items-center justify-center">
              <AllergenItem
                icon={allergens[2]?.icon}
                name={allergens[2]?.name}
                category={allergens[2]?.category}
                color={categoryToColor[allergens[2]?.category]}
                alt={allergens[2]?.alt}
              />
            </div>

            <div className="p-2 flex flex-col items-center justify-center">
              <AllergenItem
                icon={allergens[3]?.icon}
                name={allergens[3]?.name}
                category={allergens[3]?.category}
                color={categoryToColor[allergens[3]?.category]}
                alt={allergens[3]?.alt}
              />
            </div>
          </div>
        </div>

        {/* Bottom section with alert */}
        <div className="p-4 bg-white">
          <div className="flex items-start gap-2 mb-2">
            {alertIcon}
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
