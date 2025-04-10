"use client";

const ElectronicCard = ({
  coverPhoto,
  title,
  price,
  details,
  condition,
  location,
  className = "",
  imageAlt = "",
  badgeClassName = "",
  titleClassName = "",
  priceClassName = "",
  locationClassName = "",
  onClick,
  ...props
}) => {
  // Parse specific details if they're in string format
  const parseDetails = (detailsArray) => {
    if (!detailsArray) return {};

    if (Array.isArray(detailsArray)) {
      const detailsMap = {};
      detailsArray.forEach((detail) => {
        if (typeof detail === "string") {
          const [key, value] = detail.split(":");
          if (key && value) {
            detailsMap[key] = value;
          }
        } else if (detail && detail.key && detail.value) {
          detailsMap[detail.key] = detail.value;
        }
      });
      return detailsMap;
    }

    return detailsArray;
  };

  const detailsMap = parseDetails(details);
  const displayCondition = condition || detailsMap.condition || "Used";

  const handleClick = () => {
    if (onClick) {
      onClick({
        title,
        price,
        image: coverPhoto,
        images: [coverPhoto],
        description: props.description || "",
        category: "Electronics",
        categoryId: 27, // Electronics category ID
        condition: displayCondition,
        brand: props.brand || "",
        model: props.model || "",
        modelReleaseYear: props.year || "",
        warranty: props.warranty || "",
        location,
        used: displayCondition.toLowerCase() !== "new",
        distance: props.distance || "2.8 km away",
        story: props.story || "",
        additionalDetails: props.additionalDetails || "",
        seller: props.seller || {
          name: "Electronics Seller",
          verified: true,
          address: location,
        },
      });
    }
  };

  return (
    <div
      className={`col-span-1 flex justify-center items-center w-[244px] h-[280px] rounded-xl bg-white shadow-md border cursor-pointer hover:shadow-md transition-shadow ${className}`}
      onClick={handleClick}
    >
      <div className="w-[244px] h-[280px] flex flex-col">
        <div className="relative w-[244px] h-[180px]">
          <img
            src={coverPhoto || "/placeholder.svg?height=400&width=600"}
            alt={imageAlt || title}
            className="w-full h-full object-cover rounded-t-xl"
          />
          <div className="absolute top-3 right-3 bg-white/90 text-black font-medium py-1 px-2 rounded-lg">
            {displayCondition}
          </div>
        </div>
        <div className="p-3 h-[100px] flex flex-col">
          <h3
            className={`font-medium text-base mb-1 line-clamp-1 text-gray-900 ${titleClassName}`}
          >
            {title}
          </h3>
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

export default ElectronicCard;
