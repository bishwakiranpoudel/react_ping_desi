import { useState, useEffect } from "react";
import { ArrowRight, PlusCircle } from "lucide-react";
import { ClassifiedModal } from "../components/classfields_components/ClassifiedModal";
import MainLayout from "../components/MainLayout";
import PropertyListing from "../components/classfields_components/PropertyListing";
import VehicleListing from "../components/classfields_components/VechileListing";
import ElectronicsListing from "../components/classfields_components/ElectronicListing";
import ClothingListing from "../components/classfields_components/ClothingListing";
import RoommateListing from "../components/classfields_components/RoommateListing";
import ApplianceListing from "../components/classfields_components/ApplianceListing";
import SubleaseListing from "../components/classfields_components/SubleaseListing";
import { useIsMobile } from "../hooks/use-mobile";
import {
  getInitialListings,
  getListing,
  getListingCategories
} from "../services/classified";
import { toast } from "react-toastify";
import ClassifiedDetailsView from "../components/classfields_components/ClassifieldDetailsView";
import { isAuthenticated } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const ClassifiedPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [categoryData, setCategoryData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // "list" or "detail"
  const isMobile = useIsMobile();
  const handleTabChange = value => {
    setActiveTab(value);
    setViewMode("list"); // Reset to list view when changing tabs
    setSelectedListing(null);
  };

  const handleListingClick = async listing => {
    setIsProcessing(true);
    try {
      const listingDetail = await getListing(listing.id);

      setSelectedListing(listingDetail.data);
      setViewMode("detail");
    } catch (error) {
      toast.error("Error while fetching a product");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToList = () => {
    setViewMode("list");
    setSelectedListing(null);
  };

  const categoryComponentMap = {
    House: {
      component: PropertyListing,
      propName: "propertyItems"
    },
    Auto: {
      component: VehicleListing,
      propName: "vehicleItems"
    },
    Sublease: {
      component: SubleaseListing,
      propName: "subleaseItems"
    },
    Appliances: {
      component: ApplianceListing,
      propName: "applianceItems"
    },
    Electronics: {
      component: ElectronicsListing,
      propName: "electronicsItems"
    },
    Apparels: {
      component: ClothingListing,
      propName: "clothingItems"
    },
    Roommate: {
      component: RoommateListing,
      propName: "roommateItems"
    }
  };

  /* ------------------ Get all categories ----------------------*/
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getListingCategories();

        const responseMap = response.data.map(data => {
          return {
            value: data.name,
            label: data.name
          };
        });

        // Reverse the responseMap and ensure "All" is at index [0]
        const reversedResponseMap = [
          { value: "All", label: "All" },
          ...responseMap.reverse()
        ];
        reversedResponseMap.pop();

        setCategoryData(reversedResponseMap);
      } catch (error) {
        console.error("Error occurred while fetching categories", error);
        toast.error("Error occurred while fetching categories");
      }
    }

    fetchCategories();
  }, []);

  /* -------------------- Get Initial Load -----------------------*/
  const [listingsData, setListingsData] = useState([]);
  useEffect(
    () => {
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
    },
    [activeTab]
  );

  return (
    <MainLayout rs={false}>
      <div className="relative font-afacad ">
        {/* Updated Tabs Section - Only show in list view */}
        {viewMode === "list" && (
          <div className="flex flex-wrap justify-center md:justify-start mb-2 border-b border-gray-300 relative md:overflow-x-hidden">
            <div
              className="flex overflow-x-auto md:overflow-x-hidden"
              style={{
                scrollbarWidth: "none" /* Firefox */,
                msOverflowStyle: "none" /* IE and Edge */
              }}
            >
              {categoryData?.map(tab => (
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
              onClick={() => {
                if (isAuthenticated()) {
                  setIsModalOpen(true);
                } else {
                  navigate("/signin");
                }
              }}
              className="hidden md:block absolute right-0 py-1.5 px-3 bg-black text-white rounded-lg top-1/2 -translate-y-1/2"
            >
              + Create Classfields
            </button>
            {/* Floating button for smaller screens */}
            {isMobile &&
              !isModalOpen && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="fixed w-14 h-14 rounded-full bg-[#7B189F] flex items-center justify-center shadow-md border-none cursor-pointer"
                  style={{
                    bottom: "4.5rem",
                    right: "2rem",
                    zIndex: 9999 /* Highest z-index */
                  }}
                >
                  <PlusCircle size={32} color="white" />
                </button>
              )}
          </div>
        )}

        {/* Conditional rendering based on view mode */}
        {viewMode === "list" ? (
          // List View
          listingsData?.map(data => {
            const title = data.category.title;
            const config = categoryComponentMap[title];
            if (title === "Roommate") return null; // Skip Roommate category

            if (!config || (activeTab !== "All" && activeTab !== title))
              return null;

            const Component = config.component;
            const props = {
              isDouble: activeTab === "All" ? false : true,
              [config.propName]: data.category.products || [],
              onItemClick: handleListingClick
            };

            return (
              <div key={title} className="mb-6 pl-4 pt-2">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold font-fraunces pb-4">
                    {title}
                  </h2>
                  <div className="flex items-center space-x-2 font-bold text-gray-600 text-xs mr-2">
                    <span>See more</span>
                    <ArrowRight
                      className="text-sm text-gray-600"
                      width={10}
                      height={10}
                    />
                  </div>
                </div>
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
