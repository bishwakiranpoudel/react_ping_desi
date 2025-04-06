"use client";

import { useState } from "react";
import { FormLayout } from "../FormLayout";
import { ImageUpload } from "../ImageUpload";
import { ContactForm } from "./sections/ContactForm";
import { ClassifiedPreview } from "./sections/ClassifiedPreview";

export function HouseForm({
  step,
  maxSteps,
  onNext,
  onBack,
  onClose,
  formData,
  updateFormData,
}) {
  const [title, setTitle] = useState(formData.title || "");
  const [description, setDescription] = useState(formData.description || "");
  const [images, setImages] = useState(formData.images || []);
  const [propertyType, setPropertyType] = useState(formData.propertyType || "");
  const [bedrooms, setBedrooms] = useState(formData.bedrooms || "");
  const [bathrooms, setBathrooms] = useState(formData.bathrooms || "");
  const [price, setPrice] = useState(formData.price || "");
  const [listingType, setListingType] = useState(
    formData.listingType || "rent"
  );
  const [amenities, setAmenities] = useState(formData.amenities || []);
  const [story, setStory] = useState(formData.story || "");

  // Determine if Next button should be disabled
  const isNextDisabled = () => {
    switch (step) {
      case 1: // Photos
        return images.length === 0;
      case 2: // Title
        return !title.trim();
      case 3: // Details
        return !propertyType || !bedrooms || !bathrooms;
      case 4: // Price
        return !price;
      default:
        return false;
    }
  };

  // Save data when moving between steps
  const handleNext = () => {
    updateFormData({
      title,
      description,
      images,
      propertyType,
      bedrooms,
      bathrooms,
      price,
      listingType,
      amenities,
      story,
    });
    onNext();
  };

  const handleAmenityChange = (amenity, checked) => {
    if (checked) {
      setAmenities([...amenities, amenity]);
    } else {
      setAmenities(amenities.filter((a) => a !== amenity));
    }
  };

  const handleImagesChange = (newImages) => {
    setImages(newImages);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1: // Add Photos (first step after category selection)
        return (
          <ImageUpload
            category="House"
            minPhotos={6}
            images={images}
            onChange={handleImagesChange}
          />
        );
      case 2: // Add Title
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Add title of your House
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter a descriptive title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                placeholder="Describe your property"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        );
      case 3: // Key Details
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">
              Add key details about your House
            </h2>
            <div className="space-y-2">
              <label
                htmlFor="propertyType"
                className="block text-sm font-medium text-gray-700"
              >
                Property Type
              </label>
              <select
                id="propertyType"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="">Select property type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="bedrooms"
                className="block text-sm font-medium text-gray-700"
              >
                Bedrooms
              </label>
              <select
                id="bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="">Select number of bedrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5+">5+</option>
              </select>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="bathrooms"
                className="block text-sm font-medium text-gray-700"
              >
                Bathrooms
              </label>
              <select
                id="bathrooms"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              >
                <option value="">Select number of bathrooms</option>
                <option value="1">1</option>
                <option value="1.5">1.5</option>
                <option value="2">2</option>
                <option value="2.5">2.5</option>
                <option value="3+">3+</option>
              </select>
            </div>
          </div>
        );
      case 4: // Price
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Add price for your House</h2>
            <div className="space-y-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Listing Type
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="rent"
                    value="rent"
                    checked={listingType === "rent"}
                    onChange={(e) => setListingType(e.target.value)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="rent"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    For Rent
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="sale"
                    value="sale"
                    checked={listingType === "sale"}
                    onChange={(e) => setListingType(e.target.value)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="sale"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    For Sale
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Amenities
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="parking"
                    checked={amenities.includes("parking")}
                    onChange={(e) =>
                      handleAmenityChange("parking", e.target.checked)
                    }
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="parking"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Parking
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ac"
                    value="ac"
                    checked={amenities.includes("ac")}
                    onChange={(e) =>
                      handleAmenityChange("ac", e.target.checked)
                    }
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="ac"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Air Conditioning
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="furnished"
                    value="furnished"
                    checked={amenities.includes("furnished")}
                    onChange={(e) =>
                      handleAmenityChange("furnished", e.target.checked)
                    }
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="furnished"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Furnished
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="pets"
                    value="pets"
                    checked={amenities.includes("pets")}
                    onChange={(e) =>
                      handleAmenityChange("pets", e.target.checked)
                    }
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="pets"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Pets Allowed
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      case 5: // Tell story
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">
              Tell the story behind your House
            </h2>
            <p className="text-sm text-gray-500">
              Share why you're selling, what you love about it, or any
              interesting details that might help buyers connect with your
              property.
            </p>
            <div className="space-y-2">
              <label
                htmlFor="story"
                className="block text-sm font-medium text-gray-700"
              >
                Reason for selling / Additional details
              </label>
              <textarea
                id="story"
                placeholder="Tell your story..."
                rows={6}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        );
      case 6: // Contact details
        return (
          <ContactForm formData={formData} updateFormData={updateFormData} />
        );
      case 7: // Preview
        return <ClassifiedPreview formData={formData} category="House" />;
      default:
        return null;
    }
  };

  // Get step-specific title and description
  const getStepInfo = () => {
    const title = "Create Classified";
    let description = "";

    switch (step) {
      case 1:
        description = "Add photos of your House";
        break;
      case 2:
        description = "Add title and description";
        break;
      case 3:
        description = "Add key details";
        break;
      case 4:
        description = "Set price and options";
        break;
      case 5:
        description = "Tell your story";
        break;
      case 6:
        description = "Add your contact details";
        break;
      case 7:
        description = "Preview your classified";
        break;
    }

    return { title, description };
  };

  const { title: stepTitle, description: stepDescription } = getStepInfo();

  return (
    <FormLayout
      title={stepTitle}
      description={stepDescription}
      step={step}
      maxSteps={maxSteps}
      onNext={handleNext}
      onBack={onBack}
      onClose={onClose}
      isLastStep={step === maxSteps}
      isNextDisabled={isNextDisabled()}
    >
      {renderStepContent()}
    </FormLayout>
  );
}
