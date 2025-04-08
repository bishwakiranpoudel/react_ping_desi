"use client";

import { useState } from "react";
import { FormLayout } from "../FormLayout";
import { ImageUpload } from "../ImageUpload";
import { ContactForm } from "./sections/ContactForm";
import { ClassifiedPreview } from "./sections/ClassifiedPreview";

export function AutoForm({
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
  const [make, setMake] = useState(formData.make || "");
  const [model, setModel] = useState(formData.model || "");
  const [year, setYear] = useState(formData.year || "");
  const [kilometers, setKilometers] = useState(formData.kilometers || "");
  const [engineType, setEngineType] = useState(formData.engineType || "");
  const [price, setPrice] = useState(formData.price || "");
  const [condition, setCondition] = useState(formData.condition || "preowned");
  const [story, setStory] = useState(formData.story || "");

  // Determine if Next button should be disabled
  const isNextDisabled = () => {
    switch (step) {
      case 1: // Photos
        return images.length === 0;
      case 2: // Title
        return !title.trim();
      case 3: // Key Details
        return !condition || !kilometers || !engineType;
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
      make,
      model,
      year,
      kilometers,
      engineType,
      price,
      condition,
      story,
    });
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
            category="Auto"
            minPhotos={4}
            images={images}
            onChange={handleImagesChange}
          />
        );
      case 2: // Add Title
        return (
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-medium font-fraunces">
                Now, let's title your Vehicle
              </h2>
              <p className="text-sm text-gray-500">
                Get creative—you can always tweak it later!
              </p>
            </div>

            <div className="space-y-5">
              <input
                id="title"
                type="text"
                placeholder="Enter Title Here"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <textarea
                id="description"
                placeholder="Describe your vehicle"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        );
      case 3: // Key Details
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-medium font-fraunces">
              Add key details about your Vehicle
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
                    id="preowned"
                    value="preowned"
                    checked={condition === "preowned"}
                    onChange={(e) => setCondition(e.target.value)}
                    className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="preowned"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Pre-owned
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <label
                htmlFor="make"
                className="block text-sm font-medium text-gray-700"
              >
                Make
              </label>
              <input
                id="make"
                type="text"
                placeholder="Enter vehicle make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-3">
              <label
                htmlFor="model"
                className="block text-sm font-medium text-gray-700"
              >
                Model
              </label>
              <input
                id="model"
                type="text"
                placeholder="Enter vehicle model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700"
                >
                  Year
                </label>
                <input
                  id="year"
                  type="text"
                  placeholder="Enter year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-3">
                <label
                  htmlFor="kilometers"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kilometers
                </label>
                <input
                  id="kilometers"
                  type="text"
                  placeholder="Enter kilometers"
                  value={kilometers}
                  onChange={(e) => setKilometers(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label
                htmlFor="engineType"
                className="block text-sm font-medium text-gray-700"
              >
                Engine Type
              </label>
              <select
                id="engineType"
                value={engineType}
                onChange={(e) => setEngineType(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select engine type</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        );
      case 4: // Price
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-medium font-fraunces">
              Add price for your Vehicle
            </h2>
            <div className="space-y-3">
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
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        );
      case 5: // Tell story
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-medium font-fraunces">
              Tell the story behind your Vehicle
            </h2>
            <p className="text-sm text-gray-500">
              Share why you're selling, what you love about it, or any
              interesting details that might help buyers connect with your
              vehicle.
            </p>
            <div className="space-y-3">
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
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        );
      case 6: // Contact details
        return (
          <ContactForm formData={formData} updateFormData={updateFormData} />
        );
      case 7: // Preview
        return <ClassifiedPreview formData={formData} category="Auto" />;
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
        description = "Add photos of your Vehicle";
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
