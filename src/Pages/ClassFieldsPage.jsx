import React, { useState } from "react";

import PropertyCard from "../components/classfields_components/PropertyCard";
import VehicleCard from "../components/classfields_components/VechileCard";
import MainLayout from "../components/MainLayout";
import PropertyListing from "../components/classfields_components/PropertyListing";
import VehicleListing from "../components/classfields_components/VechileListing";
import ElectronicsListing from "../components/classfields_components/ElectronicListing";
import ClothingListing from "../components/classfields_components/ClothingListing";
import { useEffect } from "react";
import {
  getInitialListings,
  getListingCategories,
} from "../services/classified";
import { toast } from "react-toastify";

// Define the props for CategoryTabs
const CategoryTabs = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [categoryData, setCategoryData] = useState([]);

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
      title: "MacBook Air",
      price: "999",
      location: "New York",
      brand: "Apple",
      warranty: "1 Year",
    },
    {
      title: "Samsung Galaxy",
      price: "799",
      location: "Los Angeles",
      brand: "Samsung",
      warranty: "1 Year",
    },
    {
      title: "MacBook Air",
      price: "999",
      location: "New York",
      brand: "Apple",
      warranty: "1 Year",
    },
    {
      title: "Samsung Galaxy",
      price: "799",
      location: "Los Angeles",
      brand: "Samsung",
      warranty: "1 Year",
    },
    {
      title: "MacBook Air",
      price: "999",
      location: "New York",
      brand: "Apple",
      warranty: "1 Year",
    },
    {
      title: "Samsung Galaxy",
      price: "799",
      location: "Los Angeles",
      brand: "Samsung",
      warranty: "1 Year",
    },
    {
      title: "MacBook Air",
      price: "999",
      location: "New York",
      brand: "Apple",
      warranty: "1 Year",
    },
    {
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
  /* ------------------ Get all categories ----------------------*/
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getListingCategories();

        const responseMap = [];
        responseMap.push({ value: "all", label: "All" });
        const tempResponseMap = response.data.map((data) => {
          return {
            value: data.name,
            label: data.name,
          };
        });

        responseMap.push(...tempResponseMap);
        setCategoryData(responseMap);
      } catch (error) {
        console.error("Error occured while fetching categories", error);
        toast.error("Error occured while fetching categories");
      }
    }
    fetchCategories();
  }, []);
  /* -------------------- Get Initial Load -----------------------_____*/

  const [listingsData, setListingsData] = useState([]);
  useEffect(() => {
    async function fetchInitialListings() {
      try {
        const response = await getInitialListings();
        console.log(response.data.data);
        setListingsData(response.data.data);
      } catch (error) {
        console.error("Error occured while fetching categories", error);
        toast.error("Error occured while fetching categories");
      }
    }
    fetchInitialListings();
  }, [activeTab]);

  return (
    <MainLayout rs={false}>
      <div className="relative font-afacad">
        {/* Updated Tabs Section */}
        <div className="flex flex-wrap justify-center md:justify-start mb-2 border-b border-gray-300 relative">
          {categoryData?.map((tab) => (
            <button
              key={tab.label.toLowerCase()}
              className={`py-0 px-4 text-sm font-medium transition-all duration-300 border-b-2 ${
                activeTab === tab.label.toLowerCase()
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:border-gray-400 hover:text-gray-700"
              }`}
              onClick={() => handleTabChange(tab.label.toLowerCase())}
            >
              <div className="flex flex-col items-center">
                <img
                  src={`/images/${tab.label.toLowerCase()}.png`}
                  className="w-5 mb-1"
                  alt="Zodiac Sign"
                />
                {tab.label}
              </div>
            </button>
          ))}
          <button className="absolute right-0 py-1.5 px-3 bg-black text-white rounded-lg top-1/2 -translate-y-1/2">
            + Create Classfields
          </button>
        </div>

        {/* {listingsData?.map(
          (data) =>
            data.category.title === "House" && (
              <>
                <h1>{data.category.title}</h1>
                <PropertyListing propertyItems={data.category.products || []} />
              </>
            )
        )} */}

        {/* Display content based on active tab */}
        {activeTab === "all" && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold font-fraunces">Dream Nest</h2>
              <PropertyListing propertyItems={propertyData} isDouble={false} />
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold font-fraunces">Drive Deals</h2>
              <VehicleListing vehicleItems={vehicleData} isDouble={false} />
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold font-fraunces">
                Sublease for you
              </h2>
              <PropertyListing propertyItems={propertyData} isDouble={false} />
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold font-fraunces">Electronics</h2>
              <ElectronicsListing
                electronicsItems={electronicsData}
                isDouble={false}
              />
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold font-fraunces">Appliances</h2>
              <ElectronicsListing
                electronicsItems={electronicsData}
                isDouble={false}
              />
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold font-fraunces">Apparel</h2>
              <ClothingListing clothingItems={clothingData} isDouble={false} />
            </div>
          </>
        )}
        {activeTab === "house" && (
          <>
            <h2 className="text-xl font-bold font-fraunces">Dream Nests</h2>
            <PropertyListing propertyItems={propertyData} />
          </>
        )}
        {activeTab === "auto" && (
          <>
            <h2 className="text-xl font-bold font-fraunces">Drive Deals</h2>
            <VehicleListing vehicleItems={vehicleData} />
          </>
        )}
        {activeTab === "sublease" && (
          <>
            <h2 className="text-xl font-bold font-fraunces">
              Sublease for you
            </h2>
            <PropertyListing propertyItems={propertyData} />
          </>
        )}
        {activeTab === "electronics" && (
          <>
            <h2 className="text-xl font-bold font-fraunces">Electronics</h2>
            <ElectronicsListing electronicsItems={electronicsData} />
          </>
        )}
        {activeTab === "appliances" && (
          <>
            <h2 className="text-xl font-bold font-fraunces">Appliences</h2>
            <ElectronicsListing electronicsItems={electronicsData} />
          </>
        )}
        {activeTab === "apparel" && (
          <>
            <h2 className="text-xl font-bold font-fraunces">Apparel</h2>
            <ClothingListing clothingItems={clothingData} />
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryTabs;
