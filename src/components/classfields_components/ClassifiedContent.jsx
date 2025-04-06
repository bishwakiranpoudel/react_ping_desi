"use client"

import { useState } from "react"
import { CategorySelector } from "./CategorySelector"
import { HouseForm } from "./forms/HouseForm"
import { AutoForm } from "./forms/AutoForm"
import { FurnitureForm } from "./forms/FurnitureForm"
import { ElectronicsForm } from "./forms/ElectronicsForm"
import { ApplianceForm } from "./forms/ApplianceForm"
import { PropertyForm } from "./forms/PropertyForm"
import { SubleaseForm } from "./forms/SubleaseForm"
import { ApparelForm } from "./forms/ApparelForm"

export function ClassifiedContent({ onClose }) {
  const [category, setCategory] = useState(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({})

  // All categories follow the same 7-step flow
  const maxSteps = 7

  const handleCategorySelect = (selected) => {
    setCategory(selected)
    // Start directly at the image upload step (which is now step 1)
    setStep(1)
    setFormData({
      category: selected,
    })
  }

  const handleNext = () => {
    if (step < maxSteps) {
      setStep(step + 1)
    } else {
      // If we're at the last step and the user clicks "Post Classified"
      // We would normally submit the data to the server here
      // For now, just close the modal
      handleClose()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      setCategory(null)
    }
  }

  const handleClose = () => {
    // Reset state
    setCategory(null)
    setStep(1)
    setFormData({})
    // Close the modal
    onClose()
  }

  const updateFormData = (data) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
    }))
  }

  const renderForm = () => {
    if (!category) {
      return <CategorySelector onSelect={handleCategorySelect} />
    }

    const formProps = {
      step,
      maxSteps,
      onNext: handleNext,
      onBack: handleBack,
      onClose: handleClose,
      formData,
      updateFormData,
    }

    switch (category) {
      case "house":
        return <HouseForm {...formProps} />
      case "auto":
        return <AutoForm {...formProps} />
      case "furniture":
        return <FurnitureForm {...formProps} />
      case "electronics":
        return <ElectronicsForm {...formProps} />
      case "appliance":
        return <ApplianceForm {...formProps} />
      case "property":
        return <PropertyForm {...formProps} />
      case "sublease":
        return <SubleaseForm {...formProps} />
      case "apparel":
        return <ApparelForm {...formProps} />
      default:
        return <CategorySelector onSelect={handleCategorySelect} />
    }
  }

  return <div className="p-4 md:p-6">{renderForm()}</div>
}

