"use client";

import { useState } from "react";
import { FormLayout } from "../FormLayout";
import { ImageUpload } from "../ImageUpload";
import { ContactForm } from "./sections/ContactForm";
import { ClassifiedPreview } from "./sections/ClassifiedPreview";

export function PropertyForm({
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
  const [size, setSize] = useState(formData.size || "");
  const [price, setPrice] = useState(formData.price || "");
  const [listingType, setListingType] = useState(
    formData.listingType || "sale"
  );
  const [features, setFeatures] = useState(formData.features || []);
  const [story, setStory] = useState(formData.story || "");

  // Determine if Next button should be disabled
  const isNextDisabled = () => {
    switch (step) {
      case 1: // Photos
        return images.length === 0;
      case 2: // Title
        return !title.trim();
      case 3: // Details
        return !propertyType || !size;
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
        size,
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
        size,
        price,
        listingType,
        features,
        story,
      });
    }
    onNext();
  };

  const handleFeatureChange = (feature, checked) => {
    if (checked) {
      setFeatures([...features, feature]);
    } else {
      setFeatures(features.filter((f) => f !== feature));
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
            category="Property"
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
              Add key details about your Property
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
                className="w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white p-4"
              >
                <option value="">Select property type</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
                <option value="farm">Farm/Ranch</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-700"
              >
                Size (sq ft/acres)
              </label>
              <input
                id="size"
                type="text"
                placeholder="Enter property size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 p-4"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Property Features
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="water"
                    checked={features.includes("water")}
                    onChange={(e) =>
                      handleFeatureChange("water", e.target.checked)
                    }
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 p-4"
                  />
                  <label htmlFor="water" className="ml-2 text-sm text-gray-700">
                    Water Access
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="electricity"
                    checked={features.includes("electricity")}
                    onChange={(e) =>
                      handleFeatureChange("electricity", e.target.checked)
                    }
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 p-4"
                  />
                  <label
                    htmlFor="electricity"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Electricity
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="road"
                    checked={features.includes("road")}
                    onChange={(e) =>
                      handleFeatureChange("road", e.target.checked)
                    }
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 p-4"
                  />
                  <label htmlFor="road" className="ml-2 text-sm text-gray-700">
                    Road Access
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="zoning"
                    checked={features.includes("zoning")}
                    onChange={(e) =>
                      handleFeatureChange("zoning", e.target.checked)
                    }
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 p-4"
                  />
                  <label
                    htmlFor="zoning"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Zoning Permits
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      case 4: // Price
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium font-fraunces">
              Select your perfect price
            </h2>
            <h4 className="text-sm font-medium font-afacad text-gray-500">
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
        return <ClassifiedPreview formData={formData} category="Property" />;
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
        description = "Add photos of your Property";
        break;
      case 2:
        description = "Add title and description";
        break;
      case 3:
        description = "Add key details";
        break;
      case 4:
        description = "Set price and listing type";
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
