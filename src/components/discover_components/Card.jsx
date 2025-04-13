function Card({ item, type }) {
  return (
    <div className="flex flex-col">
      <div className="relative h-[180px] w-[244px] rounded-lg overflow-hidden ">
        <img
          src={item.imageUrl || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-2">
        <h3 className="font-medium text-sm text-gray-800">{item.name}</h3>
        <div className="flex items-center mt-1 space-x-2">
          <div className="flex items-center bg-purple-100 px-3 py-1 rounded-lg">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-purple-700"
            >
              <path d="M12 19L21 12L12 5V19Z" fill="currentColor" />
            </svg>
            <span className="text-xs  text-purple-700 ml-1">
              {item.distance} miles
            </span>
          </div>
          {item.freeDelivery && (
            <div className="flex items-center bg-green-100 px-3 py-1 rounded-lg">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-green-700"
              >
                <path
                  d="M13 11H18L14 15H16L12 19L8 15H10L6 11H11V3H13V11Z"
                  fill="currentColor"
                />
                <path
                  d="M8 5C8 6.10457 7.10457 7 6 7C4.89543 7 4 6.10457 4 5C4 3.89543 4.89543 3 6 3C7.10457 3 8 3.89543 8 5Z"
                  fill="currentColor"
                />
                <path
                  d="M20 5C20 6.10457 19.1046 7 18 7C16.8954 7 16 6.10457 16 5C16 3.89543 16.8954 3 18 3C19.1046 3 20 3.89543 20 5Z"
                  fill="currentColor"
                />
              </svg>
              <span className="text-xs  text-green-700 ml-1">
                Free Delivery
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
