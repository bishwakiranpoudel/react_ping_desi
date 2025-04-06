import React, { useState, useEffect } from "react";
import ClothingCard from "./ClothingCard";

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

const ClothingListing = ({ clothingItems, isDouble = true }) => {
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
      let itemsPerRow;
      if (window.innerWidth >= 1536) {
        itemsPerRow = Math.ceil(clothingItems.length / 3); // 3 rows for 2xl and above
      } else {
        itemsPerRow = Math.ceil(clothingItems.length / 2);
      }

      const cardHeight = 280; // Assume a fixed height for ClothingCard
      const maxRows = Math.floor((screenHeight - 80) / cardHeight);

      const adjustedItemsPerRow = Math.ceil(clothingItems.length / maxRows);

      const rows = [];
      for (let i = 0; i < clothingItems.length; i += adjustedItemsPerRow) {
        rows.push(clothingItems.slice(i, i + adjustedItemsPerRow));
      }
      return rows;
    } else {
      return [clothingItems]; // Single row
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
                <ClothingCard key={index} {...item} />
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
          {clothingItems.map((item, index) => (
            <ClothingCard key={index} {...item} />
          ))}
        </div>
      </div>
    );
  }
};

export default ClothingListing;
