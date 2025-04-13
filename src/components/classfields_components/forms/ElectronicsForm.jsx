"use client";

import { useState } from "react";
import { FormLayout } from "../FormLayout";
import { ImageUpload } from "../ImageUpload";
import { ContactForm } from "./sections/ContactForm";
import { ClassifiedPreview } from "./sections/ClassifiedPreview";

export function ElectronicsForm({
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
  const [condition, setCondition] = useState(formData.condition || "used");
  const [modelReleaseYear, setModelReleaseYear] = useState(
    formData.modelReleaseYear || ""
  );
  const [price, setPrice] = useState(formData.price || "");
  const [story, setStory] = useState(formData.story || "");

  // Determine if Next button should be disabled
  const isNextDisabled = () => {
    switch (step) {
      case 1: // Photos
        return images.length === 0;
      case 2: // Title
        return !title.trim();
      case 3: // Key Details
        return !condition || !modelReleaseYear;
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
        condition,
        modelReleaseYear,
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
        condition,
        modelReleaseYear,
        price,
        story,
      });
    }
    onNext();
  };

  const handleImagesChange = (newImages) => {
    setImages(newImages);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1: // Add Photos (first step after category selection)
        return (
          <ImageUpload
            category="Electronics"
            minPhotos={4}
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
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md  p-4"
              />
            </div>
          </div>
        );

      case 3: // Key Details
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-medium font-fraunces">
              Add key details about your Electronics
            </h2>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Condition
              </label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="new"
                    value="new"
                    checked={condition === "new"}
                    onChange={(e) => setCondition(e.target.value)}
                    className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="new"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    New
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="like-new"
                    value="like-new"
                    checked={condition === "like-new"}
                    onChange={(e) => setCondition(e.target.value)}
                    className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="like-new"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Like New
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="used"
                    value="used"
                    checked={condition === "used"}
                    onChange={(e) => setCondition(e.target.value)}
                    className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="used"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Used
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="refurbished"
                    value="refurbished"
                    checked={condition === "refurbished"}
                    onChange={(e) => setCondition(e.target.value)}
                    className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="refurbished"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Refurbished
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <label
                htmlFor="modelReleaseYear"
                className="block text-sm font-medium text-gray-700"
              >
                Model Release Year
              </label>
              <input
                id="modelReleaseYear"
                type="text"
                placeholder="Enter release year"
                value={modelReleaseYear}
                onChange={(e) => setModelReleaseYear(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
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
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md  p-4"
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
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md  p-4"
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
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md  p-4"
              />
            </div>
          </div>
        );

      case 6: // Contact details
        return (
          <ContactForm formData={formData} updateFormData={updateFormData} />
        );
      case 7: // Preview
        return <ClassifiedPreview formData={formData} category="Electronics" />;
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
        description = "Add photos of your Electronics";
        break;
      case 2:
        description = "Add title and description";
        break;
      case 3:
        description = "Add key details";
        break;
      case 4:
        description = "Set price";
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
