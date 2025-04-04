import React, { useState } from "react";

import PropertyCard from "../components/classfields_components/PropertyCard";
import VehicleCard from "../components/classfields_components/VechileCard";
import MainLayout from "../components/MainLayout";
import PropertyListing from "../components/classfields_components/PropertyListing";
import VehicleListing from "../components/classfields_components/VechileListing";
import ElectronicsListing from "../components/classfields_components/ElectronicListing";
import ClothingListing from "../components/classfields_components/ClothingListing";

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

  const vehicleData = [
    {
      title: "Tesla Model 3",
      price: "40,000",
      mileage: "15,000",
      location: "LA",
      engine: "Electric",
    },
    {
      title: "Ford Mustang",
      price: "55,000",
      mileage: "10,000",
      location: "NY",
      engine: "V8",
    },
    {
      image: "/car1.jpg",
      title: "Tesla Model 3",
      price: "40,000",
      mileage: "15,000",
      location: "LA",
      engine: "Electric",
    },
    {
      image: "/car2.jpg",
      title: "Ford Mustang",
      price: "55,000",
      mileage: "10,000",
      location: "NY",
      engine: "V8",
    },
    {
      image: "/car1.jpg",
      title: "Tesla Model 3",
      price: "40,000",
      mileage: "15,000",
      location: "LA",
      engine: "Electric",
    },
    {
      image: "/car2.jpg",
      title: "Ford Mustang",
      price: "55,000",
      mileage: "10,000",
      location: "NY",
      engine: "V8",
    },
    {
      image: "/car1.jpg",
      title: "Tesla Model 3",
      price: "40,000",
      mileage: "15,000",
      location: "LA",
      engine: "Electric",
    },
    {
      image: "/car2.jpg",
      title: "Ford Mustang",
      price: "55,000",
      mileage: "10,000",
      location: "NY",
      engine: "V8",
    },
  ];

  const clothingData = [
    {
      title: "Casual Shirt",
      price: "29",
      size: "M",
      location: "Online",
      type: "Men",
    },
    {
      title: "Leather Jacket",
      price: "99",
      size: "L",
      location: "Store",
      type: "Unisex",
    },
    {
      image: "/shirt.jpg",
      title: "Casual Shirt",
      price: "29",
      size: "M",
      location: "Online",
      type: "Men",
    },
    {
      image: "/jacket.jpg",
      title: "Leather Jacket",
      price: "99",
      size: "L",
      location: "Store",
      type: "Unisex",
    },
    {
      image: "/shirt.jpg",
      title: "Casual Shirt",
      price: "29",
      size: "M",
      location: "Online",
      type: "Men",
    },
    {
      image: "/jacket.jpg",
      title: "Leather Jacket",
      price: "99",
      size: "L",
      location: "Store",
      type: "Unisex",
    },
    {
      image: "/shirt.jpg",
      title: "Casual Shirt",
      price: "29",
      size: "M",
      location: "Online",
      type: "Men",
    },
    {
      image: "/jacket.jpg",
      title: "Leather Jacket",
      price: "99",
      size: "L",
      location: "Store",
      type: "Unisex",
    },
  ];

  const electronicsData = [
    {
      title: "MacBook Air",
      price: "999",
      location: "New York",
      brand: "Apple",
      warranty: "1 Year",
      condition: "New",
    },
    {
      title: "Samsung Galaxy",
      price: "799",
      location: "Los Angeles",
      brand: "Samsung",
      warranty: "1 Year",
      condition: "New",
    },
    {
      image: "/laptop.jpg",
      title: "MacBook Air",
      price: "999",
      location: "New York",
      brand: "Apple",
      warranty: "1 Year",
      condition: "New",
    },
    {
      image: "/phone.jpg",
      title: "Samsung Galaxy",
      price: "799",
      location: "Los Angeles",
      brand: "Samsung",
      warranty: "1 Year",
      condition: "New",
    },
    {
      image: "/laptop.jpg",
      title: "MacBook Air",
      price: "999",
      location: "New York",
      brand: "Apple",
      warranty: "1 Year",
    },
    {
      image: "/phone.jpg",
      title: "Samsung Galaxy",
      price: "799",
      location: "Los Angeles",
      brand: "Samsung",
      warranty: "1 Year",
    },
    {
      image: "/laptop.jpg",
      title: "MacBook Air",
      price: "999",
      location: "New York",
      brand: "Apple",
      warranty: "1 Year",
    },
    {
      image: "/phone.jpg",
      title: "Samsung Galaxy",
      price: "799",
      location: "Los Angeles",
      brand: "Samsung",
      warranty: "1 Year",
    },
  ];

  const propertyData = [
    {
      title: "Luxury Villa",
      price: "500,000",
      address: "Miami",
      beds: 4,
      baths: 3,
      sqft: 2500,
      distance: 1000,
    },
    {
      title: "Luxury Villa",
      price: "500,000",
      address: "Miami",
      beds: 4,
      baths: 3,
      sqft: 2500,
      distance: 1000,
    },
    {
      title: "Luxury Villa",
      price: "500,000",
      address: "Miami",
      beds: 4,
      baths: 3,
      sqft: 2500,
      distance: 1000,
    },
    {
      title: "Luxury Villa",
      price: "500,000",
      address: "Miami",
      beds: 4,
      baths: 3,
      sqft: 2500,
      distance: 1000,
    },
    {
      title: "Luxury Villa",
      price: "500,000",
      address: "Miami",
      beds: 4,
      baths: 3,
      sqft: 2500,
      distance: 1000,
    },
    {
      title: "Luxury Villa",
      price: "500,000",
      address: "Miami",
      beds: 4,
      baths: 3,
      sqft: 2500,
      distance: 1000,
    },
  ];

  return (
    <MainLayout rs={false}>
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
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold">Properties</h2>
              <PropertyListing propertyItems={propertyData} />
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold">Vehicles</h2>
              <VehicleListing vehicleItems={vehicleData} />
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold">Sublease</h2>
              <PropertyListing propertyItems={propertyData} />
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold">Electronics</h2>
              <ElectronicsListing electronicsItems={electronicsData} />
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold">Appliences</h2>
              <ElectronicsListing electronicsItems={electronicsData} />
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold">Apparel</h2>
              <ClothingListing clothingItems={clothingData} />
            </div>
          </>
        )}
        {activeTab === "house" && (
          <>
            <h2 className="text-xl font-bold">Properties</h2>
            <PropertyListing propertyItems={propertyData} />
          </>
        )}
        {activeTab === "auto" && (
          <>
            <h2 className="text-xl font-bold">Vehicles</h2>
            <VehicleListing vehicleItems={vehicleData} />
          </>
        )}
        {activeTab === "sublease" && (
          <>
            <h2 className="text-xl font-bold">Sublease</h2>
            <PropertyListing propertyItems={propertyData} />
          </>
        )}
        {activeTab === "electronics" && (
          <>
            <h2 className="text-xl font-bold">Electronics</h2>
            <ElectronicsListing electronicsItems={electronicsData} />
          </>
        )}
        {activeTab === "appliances" && (
          <>
            <h2 className="text-xl font-bold">Appliences</h2>
            <ElectronicsListing electronicsItems={electronicsData} />
          </>
        )}
        {activeTab === "apparel" && (
          <>
            <h2 className="text-xl font-bold">Apparel</h2>
            <ClothingListing clothingItems={clothingData} />
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryTabs;
