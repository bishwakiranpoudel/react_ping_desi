"use client";

function Card({ item, type }) {
  return (
    <div className="flex flex-col border shadow-sm rounded-lg">
      <div className="relative h-[180px] w-full rounded-lg overflow-hidden ">
        <img
          src={item.imageUrl || "/image/discover-list.png"}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-2 p-2">
        <h3 className="font-medium text-sm text-gray-800 mb-2">{item.name}</h3>
        <div className="flex items-center mt-1 space-x-2">
          <div className="flex items-center bg-purple-100 px-3 py-1 rounded-sm">
            <img
              src="/images/location.png"
              alt="Location"
              className="w-3 h-3"
            />
            <span className="text-xs text-purple-700 ml-1">
              {item.distance} miles
            </span>
          </div>
          <div className="flex items-center bg-green-100 px-3 py-1 rounded-sm">
            <img
              src="/images/delivery.png"
              alt="Delivery"
              className="w-4 h-4"
            />
            <span className="text-xs text-green-700 ml-1">Free Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
