import React from "react";
import VehicleCard from "./VechileCard";

const VehicleListing = ({ vehicleItems, isDouble = true }) => {
  const styles = {
    scrollbarHide: {
      overflowX: "auto",
      overflowY: "hidden",
      WebkitOverflowScrolling: "touch",
      msOverflowStyle: "none",
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  };
  if (isDouble) {
    const firstRow = vehicleItems.slice(0, Math.ceil(vehicleItems.length / 2));
    const secondRow = vehicleItems.slice(Math.ceil(vehicleItems.length / 2));
    const styles = {
      scrollbarHide: {
        overflowX: "auto",
        overflowY: "hidden",
        WebkitOverflowScrolling: "touch",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      },
    };
    return (
      <div className="space-y-6 w-full">
        {/* Wrap both rows inside a single vertically scrollable container */}
        <div className="flex flex-col gap-6 overflow-y-auto scrollbar-hide p-2">
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
  } else {
    return (
      <div className="space-y-6 w-full">
        {/* Single row */}
        <div
          className="flex gap-4 overflow-x-auto scrollbar-hide p-2"
          style={styles.scrollbarHide}
        >
          {vehicleItems.map((item, index) => (
            <VehicleCard key={index} {...item} />
          ))}
        </div>
      </div>
    );
  }
};

export default VehicleListing;
