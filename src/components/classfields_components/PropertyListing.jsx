import React from "react";
import PropertyCard from "./PropertyCard";

const PropertyListing = ({ propertyItems = [] }) => {
  const firstRow = propertyItems.slice(0, Math.ceil(propertyItems.length / 2));
  const secondRow = propertyItems.slice(Math.ceil(propertyItems.length / 2));

  return (
    <div className="space-y-6">
      {/* Wrap both rows inside a single horizontally scrollable container */}
      <div className="flex flex-col gap-6 overflow-x-auto scrollbar-hide p-2">
        {/* First row */}
        <div className="flex gap-4">
          {firstRow.map((item, index) => (
            <PropertyCard key={index} {...item} />
          ))}
        </div>
        {/* Second row */}
        <div className="flex gap-4">
          {secondRow.map((item, index) => (
            <PropertyCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;
