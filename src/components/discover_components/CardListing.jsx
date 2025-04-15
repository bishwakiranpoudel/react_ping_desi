"use client";

import { useRef } from "react";
import Card from "./Card";

function CardListing({ items, type }) {
  const scrollContainerRef = useRef(null);
  console.log(items, "items");

  const noItemsFound = !items || items.length === 0;

  return (
    <div className="relative">
      {noItemsFound ? (
        <div className="flex flex-col items-center justify-center py-10 px-4 border rounded-lg bg-gray-50">
          <img
            src="/images/no-result.png"
            alt="No items found"
            className="w-16 h-16 mb-4 opacity-60"
          />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No items found
          </h3>
          <p className="text-sm text-gray-500 text-center">
            We couldn't find any items matching your criteria. Please try
            adjusting your search.
          </p>
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex space-x-10">
            {items.map((item, index) => (
              <div key={index} className="flex-shrink-0 w-[244px]">
                <Card item={item} type={type} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CardListing;
