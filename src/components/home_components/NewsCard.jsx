"use client";

import React from "react";

const defaultNewsItem = {
  source: "The Verge",
  headline: "Local Farmers' Market Extends Weekly Hours",
  logoBackground: "#9333ea",
  logoLetter: "V",
  imageUrl:
    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
};

const NewsCard = ({
  title = "Local Buzz",
  item = defaultNewsItem,
  isMobile = false, // Set default value here
}) => {
  if (isMobile) {
    // Mobile View
    return (
      <section className="mb-6 font-afacad">
        <div className="overflow-x-auto pb-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0 w-64">
            <div className="relative h-32 w-full">
              <img
                src={item.imageUrl ?? "/placeholder.svg?height=128&width=256"}
                alt={item.headline}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <span className="text-xs text-gray-500">{item.source}</span>
              <h3 className="font-medium text-sm leading-tight">
                {item.headline}
              </h3>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop View
  return (
    <div className="w-[99%] mx-auto bg-white p-4 overflow-hidden font-afacad">
      <div>
        <h4 className="font-medium">{item.headline}</h4>
        <span className="text-xs text-gray-500">{item.source}</span>
      </div>
    </div>
  );
};

export default NewsCard;
