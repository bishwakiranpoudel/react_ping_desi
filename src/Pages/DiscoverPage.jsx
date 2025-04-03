"use client";

import { useState } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import MainLayout from "../components/MainLayout";

function DiscoverPage() {
  const isMobile = useIsMobile();
  const [categories] = useState([
    { id: 1, name: "Restaurants", icon: "🍽️", count: 124 },
    { id: 2, name: "Shopping", icon: "🛍️", count: 89 },
    { id: 3, name: "Events", icon: "🎭", count: 56 },
    { id: 4, name: "Services", icon: "🔧", count: 78 },
    { id: 5, name: "Health", icon: "⚕️", count: 42 },
    { id: 6, name: "Education", icon: "🎓", count: 31 },
  ]);

  const renderDiscoverContent = () => {
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
                  <span className="text-2xl mr-3">{category.icon}</span>
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-gray-500">
                      {category.count} listings
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
