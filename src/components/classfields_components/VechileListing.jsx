import React from "react";
import VehicleCard from "./VechileCard";

const VehicleListing = ({ vehicleItems }) => {
  const firstRow = vehicleItems.slice(0, Math.ceil(vehicleItems.length / 2));
  const secondRow = vehicleItems.slice(Math.ceil(vehicleItems.length / 2));

  return (
    <div className="space-y-6 w-full">
      {/* Wrap both rows inside a single horizontally scrollable container */}
      <div className="flex flex-col gap-6 overflow-x-auto scrollbar-hide p-2">
        {/* First row */}
        <div className="flex gap-4">
          {firstRow.map((item, index) => (
            <VehicleCard key={index} {...item} />
          ))}
        </div>
        {/* Second row */}
        <div className="flex gap-4">
          {secondRow.map((item, index) => (
            <VehicleCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleListing;
