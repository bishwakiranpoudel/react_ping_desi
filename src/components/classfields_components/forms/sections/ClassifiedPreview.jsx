import React from "react";
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
  DollarSign,
  Bath,
  BedDouble,
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
          <div className="flex flex-wrap gap-3 mt-2">
            {formData.bedrooms && (
              <div className="flex items-center gap-1 border border-gray-300 rounded-md p-1 text-gray-600">
                <BedDouble className="h-3 w-3" />
                {formData.bedrooms}{" "}
                {Number.parseInt(formData.bedrooms) === 1
                  ? "Bedroom"
                  : "Bedrooms"}
              </div>
            )}
            {formData.bathrooms && (
              <div className="flex items-center gap-1 border border-gray-300 rounded-md p-1 text-gray-600">
                <Bath className="h-3 w-3" />
                {formData.bathrooms}{" "}
                {formData.bathrooms === "1" ? "Bathroom" : "Bathrooms"}
              </div>
            )}
            {formData.propertyType && (
              <div className="flex items-center gap-1 border border-gray-300 rounded-md p-1 text-gray-600">
                <Home className="h-3 w-3" />
                {formData.propertyType.charAt(0).toUpperCase() +
                  formData.propertyType.slice(1)}
              </div>
            )}
            {formData.listingType && (
              <div className="bg-[#f2e8f5] text-[#7b189f] p-1 rounded-md">
                For{" "}
                {formData.listingType.charAt(0).toUpperCase() +
                  formData.listingType.slice(1)}
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
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Preview your classified</h2>
      <p className="text-sm text-gray-500">
        Here's how your classified will look when published. Review all details
        before posting.
      </p>

      <div className="overflow-hidden rounded-md shadow-md">
        <div className="relative w-full h-64">
          <img
            src={coverImage || "/placeholder.svg"}
            alt={formData.title || "Classified image"}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#7b189f] text-white p-1 rounded-md">
                {category}
              </div>
              {formData.price && (
                <div className="bg-white text-black p-1 rounded-md flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {formatPrice(formData.price)}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2">
            {getCategoryIcon()}
            <h3 className="font-medium">
              {formData.title || `${category} Listing`}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-gray-600 mt-1">
            <MapPin className="h-3 w-3" />
            {formData.city && formData.state
              ? `${formData.city}, ${formData.state}`
              : "Location not specified"}
          </div>

          {renderCategoryDetails()}
        </div>

        <div className="p-4 space-y-4">
          {formData.description && (
            <div>
              <h3 className="font-medium mb-1">Description</h3>
              <p className="text-sm text-gray-700">{formData.description}</p>
            </div>
          )}

          {formData.story && (
            <div>
              <h3 className="font-medium mb-1">Seller's Story</h3>
              <p className="text-sm text-gray-700">{formData.story}</p>
            </div>
          )}

          <hr className="border-gray-300" />

          <div>
            <h3 className="font-medium mb-2">Contact Information</h3>
            <div className="space-y-1">
              {formData.contactName && (
                <p className="text-sm font-medium">{formData.contactName}</p>
              )}
              {formData.contactPhone && (
                <p className="text-sm flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {formData.contactPhone}
                </p>
              )}
              {formData.contactEmail && (
                <p className="text-sm flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {formData.contactEmail}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4">
            {formData.images?.slice(0, 4).map((img, index) => (
              <div
                key={img.id}
                className="relative aspect-square rounded-md overflow-hidden"
              >
                <img
                  src={img.url || "/placeholder.svg"}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {index === 3 && formData.images.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
                    +{formData.images.length - 4} more
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
