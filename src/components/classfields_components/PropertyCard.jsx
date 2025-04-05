import React from "react";

const PropertyCard = ({
  title,
  coverPhoto,
  address,
  price,
  details,
  bedNo,
  bathNo,
  distance,
  squareFoot,
  className = "",
  imageAlt = "",
  badgeClassName = "",
  addressClassName = "",
  detailsClassName = "",
  priceClassName = "",
  distanceClassName = ""
}) => {
  // Convert array to object
  const detailsMap = details.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
  return (
    <div
      className={`col-span-1 flex justify-center items-center w-[244px] h-[380px] rounded-xl bg-white shadow-sm ${className}`}
    >
      <div className="w-[244px] h-[280px] flex flex-col">
        <div className="relative w-[244px] h-[180px]">
          <img
            src={coverPhoto || "/placeholder.svg?height=400&width=600"}
            alt={imageAlt || address}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-white/90 text-black font-medium py-1 px-2 rounded-lg flex items-center gap-1">
            <img
              src="/images/square-foot-icon.svg"
              alt="Square Foot"
              className="w-4 h-4 mr-1"
            />
            {detailsMap.squareFoot} sq.ft.
          </div>
        </div>
        <div className="p-3 h-[100px] flex flex-col">
          <h3
            className={`font-medium text-base mb-1 line-clamp text-gray-900 `}
          >
            {title}
          </h3>
          <div
            className={`flex items-center gap-2 text-sm text-gray-500 mb-1 ${detailsClassName}`}
          >
            <div className="flex items-center gap-1">
              <img src="/images/bed-icon.svg" alt="Bed" className="w-4 h-4" />
              <span>{detailsMap.bedNo} bed</span>
            </div>
            <div className="flex items-center gap-1">
              <img src="/images/bath-icon.svg" alt="Bath" className="w-4 h-4" />
              <span>{detailsMap.bathNo} bath</span>
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <div
              className={`font-bold text-gray-900 text-lg ${priceClassName}`}
            >
              <span className="text-sm align-top">$</span>
              {price}
            </div>
            <div
              className={`flex items-center text-xs text-gray-500 ${distanceClassName}`}
            >
              {distance}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
