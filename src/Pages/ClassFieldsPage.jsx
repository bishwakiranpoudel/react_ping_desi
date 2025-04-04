import React, { useState } from "react";

import PropertyCard from "../components/classfields_components/PropertyCard";
import VehicleCard from "../components/classfields_components/VechileCard";
import MainLayout from "../components/MainLayout";

// Define the props for CategoryTabs
const CategoryTabs = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { value: "all", label: "All" },
    { value: "house", label: "House" },
    { value: "auto", label: "Auto" },
    { value: "sublease", label: "Sublease" },
    { value: "electronics", label: "Electronics" },
    { value: "appliances", label: "Appliances" },
    { value: "apparel", label: "Apparel" },
  ];

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <MainLayout>
      <div className="relative">
        <div className="flex flex-wrap justify-center md:justify-start mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`py-2 px-4 rounded-none ${
                activeTab === tab.value
                  ? "bg-gray-100 text-gray-900"
                  : "bg-transparent text-gray-500"
              } hover:bg-gray-100 hover:text-gray-900`}
              onClick={() => handleTabChange(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Display content based on active tab */}
        {activeTab === "all" && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <VehicleCard
              image="/path/to/vehicle/image.jpg"
              title="Vehicle Title"
              price="10,000"
              mileage="50,000"
              location="New York"
            />

            <PropertyCard
              image="/path/to/property/image.jpg"
              address="123 Main St"
              price="500,000"
              beds={3}
              baths={2}
              distance="1.5 miles"
              sqft="2,500"
            />
          </div>
        )}
        {activeTab === "house" && (
          <div className="mt-4">
            <h2>House Listings</h2>
            <PropertyCard
              image="/path/to/property/image.jpg"
              address="123 Main St"
              price="500,000"
              beds={3}
              baths={2}
              distance="1.5 miles"
              sqft="2,500"
            />
          </div>
        )}
        {activeTab === "auto" && (
          <div className="mt-4">
            <h2>Auto Listings</h2>
            <VehicleCard
              image="/path/to/vehicle/image.jpg"
              title="Vehicle Title"
              price="10,000"
              mileage="50,000"
              location="New York"
            />
          </div>
        )}
        {activeTab === "sublease" && (
          <div className="mt-4">
            <h2>Sublease Listings</h2>
            {/* Add sublease content here */}
          </div>
        )}
        {activeTab === "electronics" && (
          <div className="mt-4">
            <h2>Electronics Listings</h2>
            {/* Add electronics content here */}
          </div>
        )}
        {activeTab === "appliances" && (
          <div className="mt-4">
            <h2>Appliances Listings</h2>
            {/* Add appliances content here */}
          </div>
        )}
        {activeTab === "apparel" && (
          <div className="mt-4">
            <h2>Apparel Listings</h2>
            {/* Add apparel content here */}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryTabs;
