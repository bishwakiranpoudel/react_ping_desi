import React, { useState, useEffect } from "react";
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

  // State to store screen height
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  // Update screen height on resize
  useEffect(() => {
    const handleResize = () => setScreenHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to split items into rows based on screen size
  const splitItemsIntoRows = () => {
    if (isDouble) {
      // Calculate items per row based on screen width
      let itemsPerRow;
      if (window.innerWidth >= 1536) {
        itemsPerRow = Math.ceil(vehicleItems.length / 3); // 3 rows for 2xl and above
      } else {
        itemsPerRow = Math.ceil(vehicleItems.length / 2);
      }

      // Calculate rows based on 80% of screen height
      const cardHeight = 280; // Assume a fixed height for VehicleCard
      const maxRows = Math.floor((screenHeight - 80) / cardHeight);

      // Adjust items per row to fit max rows
      const adjustedItemsPerRow = Math.ceil(vehicleItems.length / maxRows);

      // Split items into rows
      const rows = [];
      for (let i = 0; i < vehicleItems.length; i += adjustedItemsPerRow) {
        rows.push(vehicleItems.slice(i, i + adjustedItemsPerRow));
      }
      return rows;
    } else {
      // Single row
      return [vehicleItems];
    }
  };

  if (isDouble) {
    const rows = splitItemsIntoRows();

    return (
      <div className="space-y-6 w-full">
        {/* Wrap rows inside a single vertically scrollable container */}
        <div
          className="flex flex-col gap-6 overflow-y-auto scrollbar-hide p-2"
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
            // Set the height of the container to 80vh
          }}
        >
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-4">
              {row.map((item, index) => (
                <VehicleCard key={index} {...item} />
              ))}
            </div>
          ))}
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
