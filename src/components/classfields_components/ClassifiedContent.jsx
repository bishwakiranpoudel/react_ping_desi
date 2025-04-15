"use client";

import { useState } from "react";
import { CategorySelector } from "./CategorySelector";
import { HouseForm } from "./forms/HouseForm";
import { AutoForm } from "./forms/AutoForm";
import { ElectronicsForm } from "./forms/ElectronicsForm";
import { ApplianceForm } from "./forms/ApplianceForm";
import { SubleaseForm } from "./forms/SubleaseForm";
import { ApparelForm } from "./forms/ApparelForm";
import { postClassfieds } from "../../services/classified";
import { toast } from "react-toastify";
// import { RoommateForm } from "./forms/RoommateForm";

export function ClassifiedContent({ onClose }) {
  const [category, setCategory] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // All categories follow the same 7-step flow
  const maxSteps = 7;

  const handleCategorySelect = (selectedId) => {
    setCategory(selectedId);
    // Start directly at the image upload step (which is now step 1)
    setStep(1);
    setFormData({
      categoryId: selectedId,
    });
  };

  const handleNext = async () => {
    if (step < maxSteps) {
      setStep(step + 1);
    } else {
      try {
        console.log(formData, "data");
        setIsProcessing(true);
        const geohash = localStorage.getItem("geohash") || "9v6m";

        const submissionFormData = new FormData();

        submissionFormData.append(
          "cover_photo",
          formData.images?.[0]?.file || null
        );

        if (formData.images && formData.images.length > 1) {
          for (let i = 1; i < formData.images.length; i++) {
            submissionFormData.append(
              "product_images",
              formData.images[i].file
            );
          }
        }

        submissionFormData.append("title", formData.title || "");

        submissionFormData.append(
          "specific_details",
          JSON.stringify(formData.specific_details)
        );
        // // Handle specific_details
        // if (formData.condition) {
        //   submissionFormData.append(
        //     "specific_details",
        //     `condition:${formData.condition}`
        //   );
        // }

        // if (formData.kilometers) {
        //   submissionFormData.append(
        //     "specific_details",
        //     `kmRan:${formData.kilometers}`
        //   );
        // }

        // if (formData.engineType) {
        //   submissionFormData.append(
        //     "specific_details",
        //     `engine:${formData.engineType}`
        //   );
        // }

        submissionFormData.append("price", formData.price || "");
        submissionFormData.append("reason_for_selling", formData.story || "");
        submissionFormData.append(
          "more_description",
          formData.description || ""
        );

        submissionFormData.append("full_name", formData.fullName || "");

        submissionFormData.append("phone_number", formData.phoneNumber || "");

        submissionFormData.append("address", formData.addressLine1 || "");
        submissionFormData.append("address2", formData.addressLine2 || "");

        submissionFormData.append("state", formData.state || "");

        submissionFormData.append("geohash", geohash);

        console.log("submission form", submissionFormData);

        console.log("Submitting data:", Object.fromEntries(submissionFormData));

        // Call API to post classified
        const response = await postClassfieds(submissionFormData);

        console.log("Post successful:", response);

        toast.success("Your classified has been posted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });

        // Close modal after successful submission
        //handleClose();
      } catch (error) {
        console.error("Error posting classified:", error);

        toast.error(
          "" + (error.response?.data?.message ?? error.data?.message ?? error),
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          }
        );
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setCategory(null);
    }
  };

  const handleClose = () => {
    // Reset state
    setCategory(null);
    setStep(1);
    setFormData({});
    // Close the modal
    onClose();
  };

  const updateFormData = (data) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const renderForm = () => {
    if (!category) {
      return <CategorySelector onSelect={handleCategorySelect} />;
    }

    const formProps = {
      step,
      maxSteps,
      onNext: handleNext,
      onBack: handleBack,
      onClose: handleClose,
      formData,
      updateFormData,
      isProcessing,
    };

    switch (category) {
      case 24: // House
        return <HouseForm {...formProps} />;
      case 25: // Auto
        return <AutoForm {...formProps} />;
      case 26: // Sublease
        return <SubleaseForm {...formProps} />;
      case 27: // Electronics
        return <ElectronicsForm {...formProps} />;
      case 28: // Appliances
        return <ApplianceForm {...formProps} />;
      case 29: // Apparels
        return <ApparelForm {...formProps} />;
      case 30:
        return <CategorySelector onSelect={handleCategorySelect} />;
      default:
        return <CategorySelector onSelect={handleCategorySelect} />;
    }
  };

  return <div className="p-0 md:p-0">{renderForm()}</div>;
}
