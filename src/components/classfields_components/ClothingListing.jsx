import React from "react";
import ClothingCard from "./ClothingCard";

const ClothingListing = ({ clothingItems }) => {
  const firstRow = clothingItems.slice(0, Math.ceil(clothingItems.length / 2));
  const secondRow = clothingItems.slice(Math.ceil(clothingItems.length / 2));

  return (
    <div className="space-y-6">
      {/* Wrap both rows inside a single horizontally scrollable container */}
      <div className="flex flex-col gap-6 overflow-x-auto scrollbar-hide p-2">
        {/* First row */}
        <div className="flex gap-4">
          {firstRow.map((item, index) => (
            <ClothingCard key={index} {...item} />
          ))}
        </div>
        {/* Second row */}
        <div className="flex gap-4">
          {secondRow.map((item, index) => (
            <ClothingCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClothingListing;
