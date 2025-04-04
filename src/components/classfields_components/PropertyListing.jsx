import React from "react";
import PropertyCard from "./PropertyCard";
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
const PropertyListing = ({ propertyItems = [], isDouble = true }) => {
  if (isDouble) {
    const firstRow = propertyItems.slice(
      0,
      Math.ceil(propertyItems.length / 2)
    );
    const secondRow = propertyItems.slice(Math.ceil(propertyItems.length / 2));

    return (
      <div className="space-y-6">
        {/* Wrap both rows inside a single vertically scrollable container */}
        <div className="flex flex-col gap-6 overflow-y-auto scrollbar-hide p-2">
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
  } else {
    return (
      <div className="space-y-6">
        {/* Single row */}
        <div
          className="flex gap-4 overflow-x-auto scrollbar-hide p-2"
          style={styles.scrollbarHide}
        >
          {propertyItems.map((item, index) => (
            <PropertyCard key={index} {...item} />
          ))}
        </div>
      </div>
    );
  }
};

export default PropertyListing;
