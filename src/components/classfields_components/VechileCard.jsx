import React from "react";

const VehicleCard = ({
  coverPhoto,
  title,
  price,
  details,
  mileage,
  location,
  engine,
  className = "",
  imageAlt = "",
  badgeClassName = "",
  titleClassName = "",
  priceClassName = "",
  locationClassName = ""
}) => {
  const detailsMap = details.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
  return (
    <div
      className={`col-span-1 flex justify-center items-center w-[244px] h-[280px] rounded-xl bg-white shadow-sm ${className}`}
    >
      <div className="w-[244px] h-[280px] flex flex-col">
        <div className="relative w-[244px] h-[180px]">
          <img
            src={coverPhoto || "/placeholder.svg"}
            alt={imageAlt || title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-white/90 text-black font-medium py-1 px-2 rounded-lg">
            {detailsMap.kmRan} KM
          </div>
        </div>
        <div className="p-3 h-[100px] flex flex-col">
          <h3
            className={`font-medium text-base mb-1 line-clamp-1 text-gray-900 ${titleClassName}`}
          >
            {title}
          </h3>
          <div className="text-gray-600 text-md">{engine}</div>
          <div className="mt-auto flex items-center justify-between">
            <div
              className={`font-bold text-gray-900 text-lg ${priceClassName}`}
            >
              <span className="text-sm align-top">$</span>
              {price}
            </div>
            <div
              className={`flex items-center text-xs text-gray-500 ${locationClassName}`}
            >
              {location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
