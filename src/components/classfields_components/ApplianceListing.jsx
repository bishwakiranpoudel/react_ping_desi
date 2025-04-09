"use client";

import { useState, useEffect } from "react";
import ApplianceCard from "./ApplianceCard";

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

const ApplianceListing = ({ applianceItems, isDouble = true, onItemClick }) => {
  // State to store screen height
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  // Update screen height on resize
  useEffect(() => {
    const handleResize = () => setScreenHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to handle item click
  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick({
        ...item,
        category: "Appliances",
        images: item.images || [item.image],
      });
    }
  };

  // Function to split items into rows based on screen size
  const splitItemsIntoRows = () => {
    if (isDouble) {
      let itemsPerRow;
      if (window.innerWidth >= 1536) {
        itemsPerRow = Math.ceil(applianceItems.length / 3); // 3 rows for 2xl and above
      } else {
        itemsPerRow = Math.ceil(applianceItems.length / 2);
      }

      const cardHeight = 280; // Assume a fixed height for ApplianceCard
      const maxRows = Math.floor((screenHeight - 80) / cardHeight);

      const adjustedItemsPerRow = Math.ceil(applianceItems.length / maxRows);

      const rows = [];
      for (let i = 0; i < applianceItems.length; i += adjustedItemsPerRow) {
        rows.push(applianceItems.slice(i, i + adjustedItemsPerRow));
      }
      return rows;
    } else {
      return [applianceItems]; // Single row
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
            height: "80vh", // Set the height of the container to 80vh
          }}
        >
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-4">
              {row.map((item, index) => (
                <ApplianceCard
                  key={index}
                  {...item}
                  onClick={() => handleItemClick(item)}
                />
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
          {applianceItems.map((item, index) => (
            <ApplianceCard
              key={index}
              {...item}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default ApplianceListing;
