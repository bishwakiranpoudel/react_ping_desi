import { useState } from "react";
import { ChevronDown, ChevronUp, MapPin, ArrowLeft, Phone } from "lucide-react";
import { formatPrice } from "../../utils/helpers";
import { CATEGORY_IDS } from "../../utils/categoryMapping";

function ClassifiedDetailsView({ listing, category, onBack }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [reasonExpanded, setReasonExpanded] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  if (!listing) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>No listing selected</p>
      </div>
    );
  }
  console.log(listing, "listing");
  // Format price with commas and currency symbol
  const formattedPrice = formatPrice(listing.price);

  // Prepare images array
  const images = listing.images || [
    listing.images || "/placeholder.svg?height=600&width=800"
  ];

  // Get category ID from name if needed
  const getCategoryId = categoryName => {
    const entries = Object.entries(CATEGORY_IDS);
    const found = entries.find(
      ([key, _]) => key.toLowerCase() === categoryName.toLowerCase()
    );
    return found ? found[1] : null;
  };

  const categoryId = listing.categoryId || getCategoryId(category);

  // Render property details with icons
  const renderPropertyDetails = () => {
    const result = {
      specific_details: {}
    };
    listing.specific_details.forEach(item => {
      const key = Object.keys(item)[0];
      result.specific_details[key] = item[key];
    });

    if (
      categoryId === CATEGORY_IDS.HOUSE ||
      categoryId === CATEGORY_IDS.SUBLEASE
    ) {
      console.log("here");
      return (
        <div className="flex border-t border-b py-4 my-4">
          {result.specific_details.bedNo && (
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 21V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 11H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 11V7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 11V7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 21V17C9 15.8954 9.89543 15 11 15H13C14.1046 15 15 15.8954 15 17V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-sm text-gray-500">Bedrooms</div>
              <div className="font-medium">{result.specific_details.bedNo}</div>
            </div>
          )}
          {result.specific_details.bathNo && (
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12H20C20.5523 12 21 12.4477 21 13V17C21 17.5523 20.5523 18 20 18H4C3.44772 18 3 17.5523 3 17V13C3 12.4477 3.44772 12 4 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M6 12V6C6 5.44772 6.44772 5 7 5H9C9.55228 5 10 5.44772 10 6V12"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M6 18V20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 18V20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="text-sm text-gray-500">Baths</div>
              <div className="font-medium">
                {result.specific_details.bathNo}
              </div>
            </div>
          )}
          {result.specific_details.squareFoot && (
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 5H21V19H3V5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 9H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 9V19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="text-sm text-gray-500">Size</div>
              <div className="font-medium">
                {result.specific_details.squareFoot} sq ft
              </div>
            </div>
          )}
        </div>
      );
    }

    // For Auto listings
    if (categoryId === CATEGORY_IDS.AUTO) {
      return (
        <div className="flex border-t border-b py-4 my-4">
          {listing.mileage && (
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 8V12L15 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="text-sm text-gray-500">Mileage</div>
              <div className="font-medium">{listing.mileage} km</div>
            </div>
          )}
          {listing.year && (
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="18"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 2V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 2V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="text-sm text-gray-500">Year</div>
              <div className="font-medium">{listing.year}</div>
            </div>
          )}
          {listing.engine && (
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 4V6H5C3.89543 6 3 6.89543 3 8V18C3 19.1046 3.89543 20 5 20H19C20.1046 20 21 19.1046 21 18V8C21 6.89543 20.1046 6 19 6H17V4H7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 10V14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 12H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-sm text-gray-500">Engine</div>
              <div className="font-medium">{listing.engine}</div>
            </div>
          )}
        </div>
      );
    }

    // For Electronics and Appliances
    if (
      categoryId === CATEGORY_IDS.ELECTRONICS ||
      categoryId === CATEGORY_IDS.APPLIANCES
    ) {
      return (
        <div className="flex border-t border-b py-4 my-4">
          {listing.condition && (
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="text-sm text-gray-500">Condition</div>
              <div className="font-medium">{listing.condition}</div>
            </div>
          )}
          {listing.brand && (
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 18H12.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="text-sm text-gray-500">Brand</div>
              <div className="font-medium">{listing.brand}</div>
            </div>
          )}
          {listing.year && (
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="18"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 2V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 2V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="text-sm text-gray-500">Year</div>
              <div className="font-medium">{listing.year}</div>
            </div>
          )}
        </div>
      );
    }

    // For Apparels
    if (categoryId === CATEGORY_IDS.APPARELS) {
      return (
        <div className="flex border-t border-b py-4 my-4">
          {listing.condition && (
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="text-sm text-gray-500">Condition</div>
              <div className="font-medium">{listing.condition}</div>
            </div>
          )}
          {listing.size && (
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16 11H8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M14 15H10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="text-sm text-gray-500">Size</div>
              <div className="font-medium">{listing.size}</div>
            </div>
          )}
          {listing.brand && (
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 8.5V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V15.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 12C12 10.3431 13.3431 9 15 9H19C19.5523 9 20 9.44772 20 10V14C20 14.5523 19.5523 15 19 15H15C13.3431 15 12 13.6569 12 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="text-sm text-gray-500">Brand</div>
              <div className="font-medium">{listing.brand}</div>
            </div>
          )}
        </div>
      );
    }

    // For Roommate
    if (categoryId === CATEGORY_IDS.ROOMMATE) {
      return (
        <div className="flex border-t border-b py-4 my-4">
          {listing.roomType && (
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 21V7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 11H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-sm text-gray-500">Room Type</div>
              <div className="font-medium">{listing.roomType}</div>
            </div>
          )}
          {listing.preferredGender && (
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M5 20C5 16.6863 8.13401 14 12 14C15.866 14 19 16.6863 19 20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="text-sm text-gray-500">Preferred</div>
              <div className="font-medium">{listing.preferredGender}</div>
            </div>
          )}
          {listing.moveInDate && (
            <div className="flex-1 flex flex-col items-center">
              <div className="w-10 h-10 mb-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="18"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M16 2V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 2V6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <div className="text-sm text-gray-500">Move In</div>
              <div className="font-medium">{listing.moveInDate}</div>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  // Dynamically determine what details to show based on what's available
  const renderDetails = () => {
    // Skip if we're showing property details with icons
    if (renderPropertyDetails()) {
      return null;
    }

    // Create a details object with all relevant properties
    const details = {};

    // Add properties based on category
    switch (categoryId) {
      case CATEGORY_IDS.HOUSE:
        details.bedrooms = listing.specific_details.bedrooms;
        details.bathrooms = listing.bathrooms;
        details.propertyType = listing.propertyType;
        details.size = listing.size;
        break;
      case CATEGORY_IDS.AUTO:
        details.make = listing.make;
        details.model = listing.model;
        details.year = listing.year;
        details.mileage = listing.mileage;
        details.engine = listing.engine;
        break;
      case CATEGORY_IDS.SUBLEASE:
        details.bedrooms = listing.bedrooms;
        details.bathrooms = listing.bathrooms;
        details.leaseLength = listing.leaseLength;
        details.availableFrom = listing.availableFrom;
        details.size = listing.size;
        break;
      case CATEGORY_IDS.ELECTRONICS:
      case CATEGORY_IDS.APPLIANCES:
        details.condition = listing.condition;
        details.brand = listing.brand;
        details.model = listing.model;
        details.year = listing.year;
        break;
      case CATEGORY_IDS.APPARELS:
        details.type = listing.type;
        details.size = listing.size;
        details.brand = listing.brand;
        details.condition = listing.condition;
        details.color = listing.color;
        break;
      case CATEGORY_IDS.ROOMMATE:
        details.roomType = listing.roomType;
        details.preferredGender = listing.preferredGender;
        details.moveInDate = listing.moveInDate;
        details.duration = listing.duration;
        break;
      default:
        // Add any other properties that might be available
        Object.keys(listing).forEach(key => {
          if (
            ![
              "id",
              "title",
              "price",
              "coverPhoto",
              "reasonToSell",
              "fullName",
              "state",
              "addressLine1",
              "addressLine2",
              "phoneNumber",
              "user_id",
              "geohash",
              "specific_details",
              "created_at",
              "updated_at",
              "category_name",
              "category_id",
              "images",
              "image",
              "description",
              "category",
              "categoryId",
              "story",
              "seller",
              "used",
              "distance"
            ].includes(key) &&
            listing[key] !== null &&
            listing[key] !== undefined
          ) {
            details[key] = listing[key];
          }
        });
    }

    return (
      <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
        {Object.entries(details)
          .map(([key, value]) => {
            if (!value) return null;

            // Skip empty arrays
            if (Array.isArray(value) && value.length === 0) return null;

            // Format array values
            const displayValue = Array.isArray(value)
              ? value.join(", ")
              : value;

            // Customize label based on the key
            let label = key.charAt(0).toUpperCase() + key.slice(1);

            // Map common keys to better display labels
            if (
              key === "propertyType" ||
              key === "furnitureType" ||
              key === "apparelType"
            ) {
              label = "Type";
            } else if (key === "listingType") {
              label = "Listing";
            } else if (key === "modelReleaseYear") {
              label = "Year";
            } else if (key === "remainingLease") {
              label = "Lease";
            } else if (key === "squareFoot" || key === "size") {
              label = "Size";
            } else if (key === "fuelType") {
              label = "Fuel Type";
            }

            return (
              <div key={key} className="flex items-center space-x-2">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500">{label}</span>
                  <span className="font-medium">{displayValue}</span>
                </div>
              </div>
            );
          })
          .filter(Boolean)}{" "}
        {/* Remove null entries */}
      </div>
    );
  };

  // Breadcrumb navigation
  const renderBreadcrumbs = () => (
    <div className="flex items-center text-sm text-gray-500 mb-4">
      <a href="/classifieds" className="hover:text-gray-700">
        Classifieds
      </a>
      <span className="mx-2">›</span>
      <a
        href={`/classifieds/categories/${category.toLowerCase()}`}
        className="hover:text-gray-700"
      >
        {category}
      </a>
      <span className="mx-2">›</span>
      <span className="text-gray-700">{listing.title}</span>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb navigation */}
      {renderBreadcrumbs()}

      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 mb-4 hover:text-gray-900"
      >
        <ArrowLeft size={18} className="mr-1" />
        Back to listings
      </button>

      {/* Mobile: Vertical layout, Desktop: Horizontal layout */}
      <div className="md:grid md:grid-cols-2 md:gap-8">
        {/* Left column - Images section */}
        <div>
          {/* Main image */}
          <div className="relative w-full aspect-[4/3] mb-2 overflow-hidden rounded-lg">
            <img
              src={
                images[selectedImage] ||
                listing.coverPhoto ||
                "/placeholder.svg"
              }
              alt={`${listing.title} - Image ${selectedImage + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="overflow-x-auto pb-4 mb-6">
              <div className="flex space-x-2 min-w-max">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative w-24 h-24 cursor-pointer rounded-md overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-gray-800"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column - Details section */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">{listing.title}</h1>

          {/* Price and distance */}
          <div className="mb-4">
            <div className="text-2xl font-bold text-gray-900">
              {formattedPrice}
            </div>
            {(listing.used || listing.distance) && (
              <div className="text-sm text-gray-500 mt-1">
                {listing.used && "Used"}{" "}
                {listing.used && listing.distance && "•"}{" "}
                {listing.distance && `${listing.distance}`}
              </div>
            )}
          </div>

          {/* Property-specific details with icons */}
          {renderPropertyDetails()}

          {/* Generic details grid for other categories */}
          {renderDetails()}
          {/* Reason for Selling section */}
          {listing.story && (
            <div className="mt-4 bg-gray-50 rounded-lg">
              <button
                className="flex items-center justify-between w-full p-4 text-left"
                onClick={() => setReasonExpanded(!reasonExpanded)}
              >
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 8V12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="16" r="1" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="font-medium">Reason for Selling</span>
                </div>
                {reasonExpanded ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {reasonExpanded && (
                <div className="px-4 pb-4 text-gray-700">{listing.story}</div>
              )}
            </div>
          )}

          {/* reason for selling */}
          {listing.reasonToSell && (
            <div className="mt-4 bg-gray-50 rounded-lg">
              <button
                className="flex items-center justify-between w-full p-4 text-left"
                onClick={() => setReasonExpanded(!reasonExpanded)}
              >
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.5 6.5L6.52733 6.48667C6.61282 6.44396 6.70875 6.42664 6.80378 6.43677C6.8988 6.4469 6.98893 6.48404 7.0635 6.54381C7.13806 6.60357 7.19394 6.68345 7.22451 6.77399C7.25508 6.86453 7.25907 6.96193 7.236 7.05467L6.764 8.94533C6.74076 9.03811 6.74463 9.13561 6.77513 9.22626C6.80563 9.31691 6.86149 9.39691 6.93609 9.45678C7.01069 9.51664 7.10089 9.55384 7.196 9.56399C7.2911 9.57413 7.38712 9.55678 7.47267 9.514L7.5 9.5M13 7C13 7.78793 12.8448 8.56815 12.5433 9.2961C12.2417 10.0241 11.7998 10.6855 11.2426 11.2426C10.6855 11.7998 10.0241 12.2417 9.2961 12.5433C8.56815 12.8448 7.78793 13 7 13C6.21207 13 5.43185 12.8448 4.7039 12.5433C3.97595 12.2417 3.31451 11.7998 2.75736 11.2426C2.20021 10.6855 1.75825 10.0241 1.45672 9.2961C1.15519 8.56815 1 7.78793 1 7C1 5.4087 1.63214 3.88258 2.75736 2.75736C3.88258 1.63214 5.4087 1 7 1C8.5913 1 10.1174 1.63214 11.2426 2.75736C12.3679 3.88258 13 5.4087 13 7ZM7 4.5H7.00533V4.50533H7V4.5Z"
                        stroke="#928E99"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="font-medium">Reason To Sell</span>
                </div>
                {reasonExpanded ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {reasonExpanded && (
                <div className="px-4 pb-4 text-gray-700">
                  {listing.reasonToSell}
                </div>
              )}
            </div>
          )}
          {/* Description section */}
          {listing.description && (
            <div className="mt-4 bg-gray-50 rounded-lg">
              <button
                className="flex items-center justify-between w-full p-4 text-left"
                onClick={() => setDescriptionExpanded(!descriptionExpanded)}
              >
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 6H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M4 12H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M4 18H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="font-medium">More Description</span>
                </div>
                {descriptionExpanded ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {descriptionExpanded && (
                <div className="px-4 pb-4 text-gray-700">
                  {listing.description}
                </div>
              )}
            </div>
          )}

          {/* Seller information */}
          {listing.fullName && (
            <div className="mt-6 p-4 bg-white rounded-lg border">
              <div className="uppercase text-xs font-medium text-gray-500 mb-3">
                SELLER LOCATION:
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium">{listing.fullName}</span>
                    {listing.fullName && (
                      <span className="bg-gray-800 text-white text-xs px-2 py-0.5 rounded">
                        Verified Neighbor
                      </span>
                    )}
                  </div>
                  {listing.addressLine1 && (
                    <div className="text-sm text-gray-600">
                      {listing.addressLine1}
                    </div>
                  )}
                  {listing.addressLine2 && (
                    <div className="text-sm text-gray-600">
                      {listing.addressLine2}
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  {listing.addressLine1 && (
                    <button className="flex items-center text-sm text-gray-700">
                      <MapPin size={16} className="mr-1" />
                      View in map
                    </button>
                  )}
                  {/*listing.seller.phone && (
                    <button className="flex items-center text-sm text-gray-700">
                      <Phone size={16} className="mr-1" />
                      Call seller
                    </button>
                  )*/}
                </div>
              </div>
            </div>
          )}

          {/* Contact button */}
          <div className="mt-6">
            <button className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassifiedDetailsView;
