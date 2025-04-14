"use client";

import { useState, useEffect } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import MainLayout from "../components/MainLayout";
import { toast } from "react-toastify";
import { getListingCategories } from "../services/classified";

function DiscoverPage() {
  const isMobile = useIsMobile();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const response = await getListingCategories();
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ??
          error.data?.message ??
          error.message ??
          error;
        setError(errorMessage);

        toast.error("" + errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  console.log(categories, "categories");

  const renderDiscoverContent = () => {
    if (isLoading) {
      return <div className="p-4">Loading categories...</div>;
    }

    if (error) {
      return <div className="p-4 text-red-500">{error}</div>;
    }

    return (
      <div className={isMobile ? "p-4" : "p-0"}>
        <h1 className="text-xl lg:text-2xl font-bold mb-6 font-fraunces">
          Discover
        </h1>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{category.icon || "📋"}</span>
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-gray-500">
                      {category.count || 0} listings
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Popular Near You</h2>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-gray-500">
              Content for the Popular Near You section would go here.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // The Discover page doesn't need a right sidebar
  return <MainLayout>{renderDiscoverContent()}</MainLayout>;
}

export default DiscoverPage;
