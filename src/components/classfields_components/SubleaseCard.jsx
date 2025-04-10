"use client";

const SubleaseCard = ({
  title,
  coverPhoto,
  address,
  details,
  price,
  beds,
  baths,
  distance,
  availableFrom,
  className = "",
  imageAlt = "",
  badgeClassName = "",
  addressClassName = "",
  detailsClassName = "",
  priceClassName = "",
  distanceClassName = "",
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

  const handleClick = () => {
    if (onClick) {
      onClick({
        title: title || address,
        price,
        image: coverPhoto,
        images: [coverPhoto],
        description: props.description || "",
        category: "Sublease",
        categoryId: 26, // Sublease category ID
        bedrooms: beds || detailsMap.bedNo || "1",
        bathrooms: baths || detailsMap.bathNo || "1",
        leaseLength: props.leaseLength || "6 months",
        availableFrom: availableFrom || "Immediately",
        size: detailsMap.squareFoot || props.size || "800 sq ft",
        furnished: props.furnished || false,
        location: address || distance,
        used: false,
        distance: distance || "4.1 km away",
        story: props.story || "",
        additionalDetails: props.additionalDetails || "",
        seller: props.seller || {
          name: "Sublease Owner",
          verified: true,
          address: address || distance,
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
            alt={imageAlt || address}
            className="w-full h-full object-cover rounded-t-xl"
          />
          <div className="absolute top-3 right-3 bg-white/90 text-black font-medium py-1 px-2 rounded-lg flex items-center gap-1">
            <img
              src="/images/square-foot-icon.svg"
              alt="Square Foot"
              className="w-4 h-4 mr-1"
            />
            {detailsMap.squareFoot || "800"} sq.ft.
          </div>
        </div>
        <div className="p-3 h-[100px] flex flex-col">
          <h3
            className={`font-medium text-base mb-1 line-clamp-1 text-gray-900 ${addressClassName}`}
          >
            {title || address}
          </h3>
          <div
            className={`flex items-center gap-2 text-sm text-gray-500 mb-1 ${detailsClassName}`}
          >
            <div className="flex row items-center gap-1">
              <img src="/images/bed-icon.svg" alt="Bed" className="w-4 h-4" />
              <span>{detailsMap.bedNo || beds || "1"} bed</span>
            </div>
            <div className="flex items-center gap-1">
              <img src="/images/bath-icon.svg" alt="Bath" className="w-4 h-4" />
              <span>{detailsMap.bathNo || baths || "1"} bath</span>
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
              {availableFrom || "Available now"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubleaseCard;
