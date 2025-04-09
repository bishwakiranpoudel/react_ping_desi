"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { ClassifiedModal } from "../components/classfields_components/ClassifiedModal";
import MainLayout from "../components/MainLayout";
import PropertyListing from "../components/classfields_components/PropertyListing";
import VehicleListing from "../components/classfields_components/VechileListing";
import ElectronicsListing from "../components/classfields_components/ElectronicListing";
import ClothingListing from "../components/classfields_components/ClothingListing";
import RoommateListing from "../components/classfields_components/RoommateListing";
import ApplianceListing from "../components/classfields_components/ApplianceListing";
import SubleaseListing from "../components/classfields_components/SubleaseListing";
import {
  getInitialListings,
  getListingCategories,
} from "../services/classified";
import { toast } from "react-toastify";
import ClassifiedDetailsView from "../components/classfields_components/ClassifieldDetailsView";

const ClassifiedPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [categoryData, setCategoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // "list" or "detail"

  const handleTabChange = (value) => {
    setActiveTab(value);
    setViewMode("list"); // Reset to list view when changing tabs
    setSelectedListing(null);
  };

  const handleListingClick = (listing) => {
    setSelectedListing(listing);
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedListing(null);
  };

  const categoryComponentMap = {
    House: {
      component: PropertyListing,
      propName: "propertyItems",
    },
    Auto: {
      component: VehicleListing,
      propName: "vehicleItems",
    },
    Sublease: {
      component: SubleaseListing,
      propName: "subleaseItems",
    },
    Appliances: {
      component: ApplianceListing,
      propName: "applianceItems",
    },
    Electronics: {
      component: ElectronicsListing,
      propName: "electronicsItems",
    },
    Apparels: {
      component: ClothingListing,
      propName: "clothingItems",
    },
    Roommate: {
      component: RoommateListing,
      propName: "roommateItems",
    },
  };

  /* ------------------ Get all categories ----------------------*/
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getListingCategories();

        const responseMap = [];
        responseMap.push({ value: "All", label: "All" });
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

  /* -------------------- Get Initial Load -----------------------*/
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
        {/* Updated Tabs Section - Only show in list view */}
        {viewMode === "list" && (
          <div className="flex flex-wrap justify-center md:justify-start mb-2 border-b border-gray-300 relative md:overflow-x-hidden">
            <div
              className="flex overflow-x-auto md:overflow-x-hidden"
              style={{
                scrollbarWidth: "none" /* Firefox */,
                msOverflowStyle: "none" /* IE and Edge */,
              }}
            >
              {categoryData?.map((tab) => (
                <button
                  key={tab.label.toLowerCase()}
                  className={`py-0 px-4 text-sm font-medium transition-all duration-300 border-b-2 ${
                    activeTab === tab.label
                      ? "border-gray-900 text-gray-900"
                      : "border-transparent text-gray-500 hover:border-gray-400 hover:text-gray-700"
                  }`}
                  onClick={() => handleTabChange(tab.label)}
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={`/images/${tab.label.toLowerCase()}.png`}
                      className="w-5 mb-1"
                      alt="Category Icon"
                    />
                    {tab.label}
                  </div>
                </button>
              ))}
            </div>
            {/* Button for larger screens */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden md:block absolute right-0 py-1.5 px-3 bg-black text-white rounded-lg top-1/2 -translate-y-1/2"
            >
              + Create Classfields
            </button>
            {/* Floating button for smaller screens */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="fixed md:hidden py-1.5 px-3 bg-black text-white rounded-full"
              style={{
                bottom: "4.5rem",
                right: "2rem",
                zIndex: 9999 /* Highest z-index */,
              }}
            >
              <Plus size={18} />
            </button>
          </div>
        )}

        {/* Conditional rendering based on view mode */}
        {viewMode === "list" ? (
          // List View
          listingsData?.map((data) => {
            const title = data.category.title;
            const config = categoryComponentMap[title];

            if (!config || (activeTab !== "All" && activeTab !== title))
              return null;

            const Component = config.component;
            const props = {
              isDouble: activeTab === "All" ? false : true,
              [config.propName]: data.category.products || [],
              onItemClick: handleListingClick,
            };

            return (
              <div key={title} className="mb-6">
                <h2 className="text-xl font-bold font-fraunces">{title}</h2>
                <Component {...props} />
              </div>
            );
          })
        ) : (
          // Detail View
          <ClassifiedDetailsView
            listing={selectedListing}
            category={selectedListing?.category || ""}
            onBack={handleBackToList}
          />
        )}

        <ClassifiedModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </MainLayout>
  );
};

export default ClassifiedPage;
