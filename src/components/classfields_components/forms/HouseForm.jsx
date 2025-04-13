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
    if (step === 3) {
      const specific_details = {
        propertyType,
        bedrooms,
        bathrooms,
      };
      updateFormData({
        ...formData,
        specific_details,
      });
    } else if (step === 6) {
      updateFormData({
        ...formData,
        contactName: formData.contactName || "",
        contactEmail: formData.contactEmail || "",
        contactPhone: formData.contactPhone || "",
        preferredContact: formData.preferredContact || "",
        address: formData.address || "",
        city: formData.city || "",
        state: formData.state || "",
        zip: formData.zip || "",
        agreeTerms: formData.agreeTerms || false,
      });
    } else {
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
    }
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
                className="block text-sm font-medium text-gray-700 font-fraunces"
              >
                Add title of your Apparel
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter a descriptive title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4"
              />
            </div>
          </div>
        );

      case 3: // Key Details
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-medium font-fraunces">
              Add key details about your House
            </h2>
            <div className="space-y-3">
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
                className="w-full  border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 p-4"
              >
                <option value="">Select property type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
              </select>
            </div>
            <div className="space-y-3">
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
                className="w-full  border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 p-4"
              >
                <option value="">Select number of bedrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5+">5+</option>
              </select>
            </div>
            <div className="space-y-3">
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
                className="w-fullborder border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 p-4"
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
            <h2 className="text-lg font-medium font-fraunces">
              Select your perfect price
            </h2>
            <h4 className="text-sm font-medium font-afacad text-gray-500 ">
              Condition, features, and more -help others see the value!
            </h4>
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
                placeholder="$ Enter the amount"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4"
              />
            </div>
          </div>
        );
      case 5: // Tell story
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium font-fraunces">
              Tell the story behind your Apparel
            </h2>
            <p className="text-sm text-gray-500">
              Why sell? share the details!
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
                rows={6}
                placeholder="Tell your story..."
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4"
              />
            </div>
            <p className="text-sm text-gray-500">
              Why sell? share the details!
            </p>
            <div className="space-y-2">
              <label
                htmlFor="story"
                className="block text-sm font-medium text-gray-700"
              >
                More Description
              </label>
              <textarea
                id="description"
                rows={6}
                placeholder="Add a personal touch -what should buyers know?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-4"
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
