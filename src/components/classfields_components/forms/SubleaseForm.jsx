"use client";

import { useState } from "react";
import { FormLayout } from "../FormLayout";
import { ImageUpload } from "../ImageUpload";
import { ContactForm } from "./sections/ContactForm";
import { ClassifiedPreview } from "./sections/ClassifiedPreview";

export function SubleaseForm({
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
  const [condition, setCondition] = useState(formData.condition || "good");
  const [totalLeaseLength, setTotalLeaseLength] = useState(
    formData.totalLeaseLength || ""
  );
  const [remainingLease, setRemainingLease] = useState(
    formData.remainingLease || ""
  );
  const [agreementType, setAgreementType] = useState(
    formData.agreementType || ""
  );
  const [securityDeposit, setSecurityDeposit] = useState(
    formData.securityDeposit || ""
  );
  const [squareFoot, setSquareFoot] = useState(formData.squareFoot || "");
  const [bedrooms, setBedrooms] = useState(formData.bedrooms || "");
  const [bathrooms, setBathrooms] = useState(formData.bathrooms || "");
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
        return (
          !totalLeaseLength ||
          !remainingLease ||
          !agreementType ||
          !bedrooms ||
          !bathrooms
        );
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
      condition,
      totalLeaseLength,
      remainingLease,
      agreementType,
      securityDeposit,
      squareFoot,
      bedrooms,
      bathrooms,
      price,
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
            category="Sublease"
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
                Now, let's title your Sublease
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
                placeholder="Describe your sublease property"
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
              Add key details about your Sublease
            </h2>
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Condition
              </label>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="excellent"
                    value="excellent"
                    checked={condition === "excellent"}
                    onChange={(e) => setCondition(e.target.value)}
                    className="h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="excellent"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Excellent
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <label
                  htmlFor="totalLeaseLength"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Lease Length (months)
                </label>
                <input
                  id="totalLeaseLength"
                  type="number"
                  placeholder="e.g., 12"
                  value={totalLeaseLength}
                  onChange={(e) => setTotalLeaseLength(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-3">
                <label
                  htmlFor="remainingLease"
                  className="block text-sm font-medium text-gray-700"
                >
                  Remaining Lease (months)
                </label>
                <input
                  id="remainingLease"
                  type="number"
                  placeholder="e.g., 8"
                  value={remainingLease}
                  onChange={(e) => setRemainingLease(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label
                htmlFor="agreementType"
                className="block text-sm font-medium text-gray-700"
              >
                Agreement Type
              </label>
              <select
                id="agreementType"
                value={agreementType}
                onChange={(e) => setAgreementType(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select agreement type</option>
                <option value="standard">Standard Lease</option>
                <option value="month-to-month">Month-to-Month</option>
                <option value="student">Student Housing</option>
                <option value="corporate">Corporate Housing</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-3">
              <label
                htmlFor="securityDeposit"
                className="block text-sm font-medium text-gray-700"
              >
                Security Deposit
              </label>
              <input
                id="securityDeposit"
                type="number"
                placeholder="Enter security deposit amount"
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-3">
              <label
                htmlFor="squareFoot"
                className="block text-sm font-medium text-gray-700"
              >
                Square Footage
              </label>
              <input
                id="squareFoot"
                type="number"
                placeholder="Enter square footage"
                value={squareFoot}
                onChange={(e) => setSquareFoot(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
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
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select bedrooms</option>
                  <option value="studio">Studio</option>
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
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select bathrooms</option>
                  <option value="1">1</option>
                  <option value="1.5">1.5</option>
                  <option value="2">2</option>
                  <option value="2.5">2.5</option>
                  <option value="3+">3+</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 4: // Price
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-medium font-fraunces">
              Add monthly rent for your Sublease
            </h2>
            <div className="space-y-3">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Monthly Rent
              </label>
              <input
                id="price"
                type="number"
                placeholder="Enter monthly rent"
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
              Tell the story behind your Sublease
            </h2>
            <p className="text-sm text-gray-500">
              Share why you're subleasing, what you love about the place, or any
              interesting details that might help potential tenants connect with
              your property.
            </p>
            <div className="space-y-3">
              <label
                htmlFor="story"
                className="block text-sm font-medium text-gray-700"
              >
                Reason for subleasing / Additional details
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
        return <ClassifiedPreview formData={formData} category="Sublease" />;
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
        description = "Add photos of your Sublease";
        break;
      case 2:
        description = "Add title and description";
        break;
      case 3:
        description = "Add key details";
        break;
      case 4:
        description = "Set monthly rent";
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
