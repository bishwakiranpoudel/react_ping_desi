import React from "react";
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
  if (isDouble) {
    const firstRow = clothingItems.slice(
      0,
      Math.ceil(clothingItems.length / 2)
    );
    const secondRow = clothingItems.slice(Math.ceil(clothingItems.length / 2));

    return (
      <div className="space-y-6">
        {/* Wrap both rows inside a single vertically scrollable container */}
        <div
          className="flex flex-col gap-6 overflow-y-auto scrollbar-hide p-2"
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
          }}
        >
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
  } else {
    return (
      <div className="space-y-6">
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
