import {
  Home,
  Car,
  Sofa,
  Tv2,
  Refrigerator,
  Building,
  MapPin,
  Phone,
  Mail,
  Bath,
  BedDouble,
  ChevronLeft,
  Share2,
  Heart,
  ExternalLink,
} from "lucide-react";

export function ClassifiedPreview({ formData, category }) {
  // Find cover image
  const coverImage =
    formData.images?.find((img) => img.isCover)?.url ||
    (formData.images && formData.images.length > 0
      ? formData.images[0].url
      : "/placeholder.svg");

  // Format price
  const formatPrice = (price) => {
    if (!price) return "$0";
    return `$${Number.parseInt(price).toLocaleString()}`;
  };

  // Get category icon
  const getCategoryIcon = () => {
    switch (category.toLowerCase()) {
      case "house":
        return <Home className="h-5 w-5" />;
      case "auto":
        return <Car className="h-5 w-5" />;
      case "furniture":
        return <Sofa className="h-5 w-5" />;
      case "electronics":
        return <Tv2 className="h-5 w-5" />;
      case "appliance":
        return <Refrigerator className="h-5 w-5" />;
      case "property":
        return <Building className="h-5 w-5" />;
      default:
        return <Home className="h-5 w-5" />;
    }
  };

  // Get category-specific details
  const renderCategoryDetails = () => {
    switch (category.toLowerCase()) {
      case "house":
        return (
          <div className="flex flex-wrap gap-6 mt-6 border-t border-b border-gray-200 py-4">
            {formData.bedrooms && (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <BedDouble className="h-5 w-5 text-gray-500" />
                  <span className="text-xl font-semibold">
                    {formData.bedrooms}
                  </span>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {Number.parseInt(formData.bedrooms) === 1
                    ? "Bedroom"
                    : "Bedrooms"}
                </span>
              </div>
            )}
            {formData.bathrooms && (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-gray-500" />
                  <span className="text-xl font-semibold">
                    {formData.bathrooms}
                  </span>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  {formData.bathrooms === "1" ? "Bathroom" : "Bathrooms"}
                </span>
              </div>
            )}
            {formData.propertyType && (
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium">
                    {formData.propertyType.charAt(0).toUpperCase() +
                      formData.propertyType.slice(1)}
                  </span>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  Property Type
                </span>
              </div>
            )}
          </div>
        );
      // Add other category-specific details here
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-xl font-bold font-fraunces">
          Here's How Your Listing Looks!
        </h2>
        <button className="text-gray-500 hover:text-gray-700">
          <span className="sr-only">Close</span>
          &times;
        </button>
      </div>

      {/* Main content */}
      <div className="overflow-y-auto max-h-[80vh]">
        {/* Cover image */}
        <div className="relative w-full h-[300px] md:h-[400px]">
          <img
            src={coverImage || "/placeholder.svg"}
            alt={formData.title || "Classified image"}
            className="w-full h-full object-cover"
          />

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="bg-white p-2 rounded-full shadow-md">
              <Share2 className="h-5 w-5 text-gray-700" />
            </button>
            <button className="bg-white p-2 rounded-full shadow-md">
              <Heart className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Category and price tag */}
          {formData.listingType && (
            <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              For{" "}
              {formData.listingType.charAt(0).toUpperCase() +
                formData.listingType.slice(1)}
            </div>
          )}
        </div>

        {/* Thumbnail gallery */}
        {formData.images && formData.images.length > 1 && (
          <div className="flex overflow-x-auto gap-2 p-2 bg-gray-50">
            {formData.images.map((img, index) => (
              <div
                key={img.id || index}
                className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden"
              >
                <img
                  src={img.url || "/placeholder.svg"}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Title and location */}
        <div className="p-4">
          <div className="flex items-center gap-2 text-purple-700 text-sm font-medium mb-1">
            {getCategoryIcon()}
            <span>{category}</span>
          </div>

          <h1 className="text-2xl font-bold mb-2">
            {formData.title || `${category} Listing`}
          </h1>

          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>
              {formData.address ||
                (formData.city && formData.state
                  ? `${formData.address || ""}, ${formData.city}, ${
                      formData.state
                    } ${formData.zip || ""}`
                  : "Location not specified")}
            </span>
          </div>

          {/* Price */}
          {formData.price && (
            <div className="mt-3 text-2xl font-bold text-purple-700">
              {formatPrice(formData.price)}
            </div>
          )}

          {/* Category-specific details */}
          {renderCategoryDetails()}
        </div>

        {/* Collapsible sections */}
        <div className="px-4 space-y-4">
          {/* Reason for selling */}
          {formData.reasonForSelling && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Reason For Selling</span>
                </div>
                <ChevronLeft className="h-5 w-5 transform rotate-90" />
              </div>
              <div className="p-4">
                <p className="text-gray-700">{formData.reasonForSelling}</p>
              </div>
            </div>
          )}

          {/* Description */}
          {formData.description && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-2">
                  <span className="font-medium">More Description</span>
                </div>
                <ChevronLeft className="h-5 w-5 transform rotate-90" />
              </div>
              <div className="p-4">
                <p className="text-gray-700">{formData.description}</p>
              </div>
            </div>
          )}

          {/* Seller's story */}
          {formData.story && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Seller's Story</span>
                </div>
                <ChevronLeft className="h-5 w-5 transform rotate-90" />
              </div>
              <div className="p-4">
                <p className="text-gray-700">{formData.story}</p>
              </div>
            </div>
          )}
        </div>

        {/* Seller info */}
        <div className="p-4 mt-4">
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-3">Seller</h3>

              {/* Property address */}
              {(formData.address || formData.city) && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Property
                  </h4>
                  <p className="text-gray-900">
                    {formData.address || ""}
                    {formData.address &&
                      (formData.city || formData.state) &&
                      ", "}
                    {formData.city || ""}
                    {formData.city && formData.state && ", "}
                    {formData.state || ""} {formData.zip || ""}
                  </p>
                </div>
              )}

              {/* Contact info */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Contact Seller
                  </h4>
                  {formData.contactName && (
                    <p className="text-gray-900 font-medium">
                      {formData.contactName}
                    </p>
                  )}
                  {formData.contactPhone && (
                    <p className="text-gray-700 flex items-center gap-1 mt-1">
                      <Phone className="h-4 w-4" />
                      {formData.contactPhone}
                    </p>
                  )}
                  {formData.contactEmail && (
                    <p className="text-gray-700 flex items-center gap-1 mt-1">
                      <Mail className="h-4 w-4" />
                      {formData.contactEmail}
                    </p>
                  )}
                </div>

                {/* Map link */}
                {(formData.address || formData.city) && (
                  <button className="text-purple-700 flex items-center gap-1 text-sm">
                    <ExternalLink className="h-4 w-4" />
                    View in map
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with action buttons */}
    </div>
  );
}
