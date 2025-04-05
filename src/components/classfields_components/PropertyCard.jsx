import React from "react";

const PropertyCard = ({
  title,
  coverPhoto,
  address,
  price,
  beds,
  baths,
  distance,
  sqft,
  className = "",
  imageAlt = "",
  badgeClassName = "",
  addressClassName = "",
  detailsClassName = "",
  priceClassName = "",
  distanceClassName = ""
}) => {
  return (
    <div
      className={`col-span-1 flex justify-center items-center w-[244px] h-[280px] rounded-xl bg-white shadow-sm ${className}`}
    >
      <div className="w-[244px] h-[280px] flex flex-col">
        <div className="relative w-[244px] h-[180px]">
          <img
            src={coverPhoto || "/placeholder.svg?height=400&width=600"}
            alt={imageAlt || address}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3 h-[100px] flex flex-col">
          <h3
            className={`font-medium text-base mb-1 line-clamp-1 text-gray-900 ${addressClassName}`}
          >
            {address}
          </h3>
          <div
            className={`flex items-center gap-2 text-sm text-gray-500 mb-1 ${detailsClassName}`}
          />

              <span className="text-sm">{title}</span>
          <div className="mt-auto flex items-center justify-between">

            <div
              className={`font-bold text-gray-900 text-lg ${priceClassName}`}
            >
              <span className="text-sm align-top">$</span>
              {price}
            </div>
            <div
              className={`flex items-center text-xs text-gray-500 ${distanceClassName}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
