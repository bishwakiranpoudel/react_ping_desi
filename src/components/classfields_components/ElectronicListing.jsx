import React from "react";
import ElectronicsCard from "./ElectronicCard";

const ElectronicsListing = ({ electronicsItems }) => {
  const firstRow = electronicsItems.slice(
    0,
    Math.ceil(electronicsItems.length / 2)
  );
  const secondRow = electronicsItems.slice(
    Math.ceil(electronicsItems.length / 2)
  );

  return (
    <div className="space-y-6">
      {/* Wrap both rows inside a single horizontally scrollable container */}
      <div className="flex flex-col gap-6 overflow-x-auto scrollbar-hide p-2">
        {/* First row */}
        <div className="flex gap-4">
          {firstRow.map((item, index) => (
            <ElectronicsCard key={index} {...item} />
          ))}
        </div>
        {/* Second row */}
        <div className="flex gap-4">
          {secondRow.map((item, index) => (
            <ElectronicsCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectronicsListing;
