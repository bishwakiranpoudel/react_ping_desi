import React from "react";

// Define the props for VehicleCard
const ElectronicCard = ({
  image,
  title,
  price,
  condition,
  location,
  className = "",
  imageAlt = "",
  badgeClassName = "",
  titleClassName = "",
  priceClassName = "",
  locationClassName = "",
}) => {
  return (
    <div
      className={`rounded-xl overflow-hidden bg-white h-full flex flex-col shadow-sm ${className}`}
    >
      <div className="relative">
        <img
          src={image || "/placeholder.svg?height=400&width=600"}
          alt={imageAlt || title}
          className="w-full aspect-[4/3] object-cover"
        />
        <div className="absolute top-3 right-3">
          <div
            className={`bg-white/90 text-black font-medium py-1 px-2 rounded-lg ${badgeClassName}`}
          >
            {condition}
          </div>
        </div>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3
          className={`font-medium text-base mb-2 line-clamp-1 text-gray-900 ${titleClassName}`}
        >
          {title}
        </h3>
        <div className="mt-auto flex items-center justify-between">
          <div className={`font-bold text-gray-900 text-lg ${priceClassName}`}>
            <span className="text-sm align-top">$</span>
            {price}
          </div>
          <div
            className={`flex items-center text-xs text-gray-500 ${locationClassName}`}
          >
            <img
              src="/images/location-icon.svg"
              alt="Location"
              className="mr-1 w-4 h-4"
            />
            {location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectronicCard;
