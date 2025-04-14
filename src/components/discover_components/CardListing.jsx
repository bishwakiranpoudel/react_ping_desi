"use client";

import { useRef } from "react";
import Card from "./Card";

function CardListing({ items, type }) {
  const scrollContainerRef = useRef(null);

  return (
    <div className="relative">
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
    </div>
  );
}

export default CardListing;
