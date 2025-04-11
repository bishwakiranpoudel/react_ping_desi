"use client";

import { useState } from "react";
import { FormLayout } from "../FormLayout";
import { ImageUpload } from "../ImageUpload";
import { ContactForm } from "./sections/ContactForm";
import { ClassifiedPreview } from "./sections/ClassifiedPreview";

export function FurnitureForm({
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
  const [furnitureType, setFurnitureType] = useState(
    formData.furnitureType || ""
  );
  const [material, setMaterial] = useState(formData.material || "");
  const [age, setAge] = useState(formData.age || "");
  const [price, setPrice] = useState(formData.price || "");
  const [condition, setCondition] = useState(formData.condition || "used");
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
        return !furnitureType;
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
        furnitureType,
        material,
        age,
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
        furnitureType,
        material,
        age,
        price,
        condition,
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
            category="Furniture"
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
                Now, let's title your Furniture
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
                placeholder="Describe your furniture"
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
              Add key details about your Furniture
            </h2>
            <div className="space-y-3">
              <label
                htmlFor="furnitureType"
                className="block text-sm font-medium text-gray-700"
              >
                Furniture Type
              </label>
              <select
                id="furnitureType"
                value={furnitureType}
                onChange={(e) => setFurnitureType(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select furniture type</option>
                <option value="sofa">Sofa/Couch</option>
                <option value="table">Table</option>
                <option value="chair">Chair</option>
                <option value="bed">Bed</option>
                <option value="storage">Storage</option>
                <option value="desk">Desk</option>
                <option value="bookcase">Bookcase</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-3">
              <label
                htmlFor="material"
                className="block text-sm font-medium text-gray-700"
              >
                Primary Material
              </label>
              <select
                id="material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select primary material</option>
                <option value="wood">Wood</option>
                <option value="metal">Metal</option>
                <option value="glass">Glass</option>
                <option value="fabric">Fabric</option>
                <option value="leather">Leather</option>
                <option value="plastic">Plastic</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-3">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700"
              >
                Age
              </label>
              <select
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select age</option>
                <option value="0-1">Less than 1 year</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
                <option value="antique">Antique</option>
              </select>
            </div>
          </div>
        );
      case 4: // Price
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-medium font-fraunces">
              Add price and condition for your Furniture
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
                    id="good"
                    value="good"
                    checked={condition === "good"}
                    onChange={(e) => setCondition(e.target.value)}
                    className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="good"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Good
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="fair"
                    value="fair"
                    checked={condition === "fair"}
                    onChange={(e) => setCondition(e.target.value)}
                    className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="fair"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Fair
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Features
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="assembled"
                    checked={features.includes("assembled")}
                    onChange={(e) =>
                      handleFeatureChange("assembled", e.target.checked)
                    }
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label
                    htmlFor="assembled"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Assembled
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="delivery"
                    checked={features.includes("delivery")}
                    onChange={(e) =>
                      handleFeatureChange("delivery", e.target.checked)
                    }
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label
                    htmlFor="delivery"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Delivery Available
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="pet-free"
                    checked={features.includes("pet-free")}
                    onChange={(e) =>
                      handleFeatureChange("pet-free", e.target.checked)
                    }
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label
                    htmlFor="pet-free"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Pet-Free Home
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="smoke-free"
                    checked={features.includes("smoke-free")}
                    onChange={(e) =>
                      handleFeatureChange("smoke-free", e.target.checked)
                    }
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label
                    htmlFor="smoke-free"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Smoke-Free Home
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      case 5: // Tell story
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-medium font-fraunces">
              Tell the story behind your Furniture
            </h2>
            <p className="text-sm text-gray-500">
              Share why you're selling, what you love about it, or any
              interesting details that might help buyers connect with your
              furniture.
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
        return <ClassifiedPreview formData={formData} category="Furniture" />;
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
        description = "Add photos of your Furniture";
        break;
      case 2:
        description = "Add title and description";
        break;
      case 3:
        description = "Add key details";
        break;
      case 4:
        description = "Set price and condition";
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
