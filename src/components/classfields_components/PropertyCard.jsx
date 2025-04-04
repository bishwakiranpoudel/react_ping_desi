import React from "react";

// Define the props for PropertyCard
const PropertyCard = ({
  image,
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
  distanceClassName = "",
}) => {
  return (
    <div
      className={`rounded-xl overflow-hidden bg-white h-full flex flex-col shadow-sm ${className}`}
    >
      <div className="relative">
        <img
          src={image || "/placeholder.svg?height=400&width=600"}
          alt={imageAlt || address}
          className="w-full aspect-[4/3] object-cover"
        />
        <div className="absolute top-3 right-3">
          <div
            className={`bg-white/90 text-black font-medium py-1 px-2 rounded-lg flex items-center gap-1 ${badgeClassName}`}
          >
            <img
              src="/images/square-foot-icon.png"
              alt="Square Foot"
              className="w-4 h-4 mr-1"
            />
            {sqft} sq.ft.
          </div>
        </div>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3
          className={`font-medium text-base mb-2 line-clamp-1 text-gray-900 ${addressClassName}`}
        >
          {address}
        </h3>
        <div
          className={`flex items-center gap-4 text-sm text-gray-500 mb-2 ${detailsClassName}`}
        >
          <div className="flex items-center gap-1">
            <img
              src="/images/bed-icon.png"
              alt="Bed"
              className="w-4 h-4 mr-1"
            />
            <span>{beds} bed</span>
          </div>
          <div className="flex items-center gap-1">
            <img
              src="/images/bath-icon.png"
              alt="Bath"
              className="w-4 h-4 mr-1"
            />
            <span>{baths} bath</span>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className={`font-bold text-gray-900 text-lg ${priceClassName}`}>
            <span className="text-sm align-top">$</span>
            {price}
          </div>
          <div
            className={`flex items-center text-xs text-gray-500 ${distanceClassName}`}
          >
            <img
              src="/images/location-icon.png"
              alt="Location"
              className="w-4 h-4 mr-1"
            />
            {distance}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
