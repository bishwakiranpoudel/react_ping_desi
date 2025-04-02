"use client";

import React, { useMemo } from "react";
import { MapPin } from "lucide-react";

const HappeningCard = ({
  image,
  imageAlt = "Event Image",
  category,
  title,
  description,
  time,
  location,
  date,
  isMobile = false,
  onGetDirection = () => {},
}) => {
  const formattedDate = useMemo(() => {
    return `${date.day} ${date.month} ${date.year}`;
  }, [date]);

  const MobileView = () => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden w-[280px] flex-shrink-0">
      <div className="relative h-40 w-full">
        <img
          src={image || "/placeholder.svg"}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute top-2 left-2 ${category.bgColor} ${category.textColor} text-xs px-2 py-1 rounded-sm`}
        >
          {category.icon} {category.name}
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium">{title}</h3>
        <p className="text-xs text-gray-600 mt-1 mb-2">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="text-sm font-medium">{time}</div>
            <div className="flex items-center text-xs text-gray-500">
              <MapPin className="h-3 w-3 mr-1" /> {location}
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="text-center bg-gray-100 rounded-sm p-1 w-10">
              <div className="text-lg font-bold">{date.day}</div>
              <div className="text-xs">{date.month}</div>
              <div className="text-xs">{date.year}</div>
            </div>
          </div>
        </div>
        <button
          className="mt-3 w-full py-1.5 bg-white border border-gray-300 text-gray-800 rounded-md text-sm"
          onClick={onGetDirection}
        >
          Get Direction
        </button>
      </div>
    </div>
  );

  const DesktopView = () => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border  flex mb-6">
      <div className="relative w-1/3 min-w-[200px]">
        <img
          src={image || "/placeholder.svg"}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute top-2 left-2 ${category.bgColor} ${category.textColor} text-xs px-2 py-1 rounded-sm`}
        >
          {category.icon} {category.name}
        </div>
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
          <hr className="my-4 border-gray-300" />
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-base font-medium">{time}</div>
                <div className="text-sm text-gray-500">{formattedDate}</div>
              </div>
              <div className="h-6 border-r border-gray-300 mx-4" />
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" /> {location}
              </div>
            </div>
            <button
              className="px-6 py-2 bg-white border border-gray-300 text-gray-800 rounded-md text-sm hover:bg-gray-50 transition-colors"
              onClick={onGetDirection}
            >
              Get Direction
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return isMobile ? <MobileView /> : <DesktopView />;
};

export default HappeningCard;
