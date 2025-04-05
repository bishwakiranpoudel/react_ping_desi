"use client";

import { useState } from "react";
import { Camera, Image, MapPin, Link2, Hash, X } from "lucide-react";
import Button from "./Button";
import MobileHeader from "./MobileHeader";
import { classNames } from "../../utils/classNames";
import ImagePickerModal from "./ImagePickerModal";

function Hashtag({ tag, onClick, selected }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "px-3 py-1 rounded-full text-sm font-medium",
        selected
          ? "bg-primary text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      )}
    >
      #{tag}
    </button>
  );
}

function MobileCreateScoop({ onClose, onPost }) {
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [image, setImage] = useState(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [imagePickerMode, setImagePickerMode] = useState("upload");
  const [step, setStep] = useState("category");

  const categories = [
    {
      id: "restaurants",
      name: "Restaurants",
      emoji: "🍽️",
      color: "bg-secondary",
    },
    { id: "events", name: "Events", emoji: "🎉", color: "bg-accent" },
    { id: "shopping", name: "Shopping", emoji: "🛍️", color: "bg-orange-100" },
  ];

  const availableHashtags = ["InfoDrop", "Dine In", "Take out", "Review"];

  const toggleHashtag = (tag) => {
    if (selectedHashtags.includes(tag)) {
      setSelectedHashtags(selectedHashtags.filter((t) => t !== tag));
    } else {
      setSelectedHashtags([...selectedHashtags, tag]);
    }
  };

  const openImagePicker = (mode) => {
    setImagePickerMode(mode);
    setIsImagePickerOpen(true);
  };

  const handleImageSelected = (imageUrl) => {
    setImage(imageUrl);
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setStep("content");
  };

  const handlePost = () => {
    onPost({
      content,
      category: selectedCategory,
      hashtags: selectedHashtags,
      image,
    });
    onClose();
  };

  const getStepTitle = () => {
    switch (step) {
      case "category":
        return "Create Scoop";
      case "content":
        return "Create Scoop";
      case "hashtags":
        return "Add Hashtags";
      default:
        return "Create Scoop";
    }
  };

  const renderCategoryStep = () => (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Select a category</h2>
      <div className="grid gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            className={classNames(
              "flex items-center gap-3 p-3 rounded-md border cursor-pointer",
              category.id === selectedCategory
                ? "border-primary"
                : "border-gray-200"
            )}
            onClick={() => handleSelectCategory(category.id)}
          >
            <div
              className={classNames(
                "w-10 h-10 rounded-full flex items-center justify-center",
                category.color,
                category.id === "restaurants" && "bg-secondary",
                category.id === "events" && "bg-accent",
                category.id === "shopping" && "bg-orange-100"
              )}
            >
              <span className="text-xl">{category.emoji}</span>
            </div>
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderContentStep = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 flex-1">
        <div className="mb-4">
          <textarea
            placeholder="What's in your mind?"
            className="w-full p-2 min-h-[150px] border-none outline-none resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {image && (
          <div className="mb-4 relative">
            <img
              src={image || "/placeholder.svg"}
              alt="Uploaded content"
              className="w-full h-auto rounded-md"
            />
            <Button
              variant="outline"
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center p-0"
              onClick={() => setImage(null)}
            >
              <X size={16} />
            </Button>
          </div>
        )}

        {selectedHashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedHashtags.map((tag) => (
              <Hashtag
                key={tag}
                tag={tag}
                selected
                onClick={() => toggleHashtag(tag)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => openImagePicker("camera")}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <Camera size={24} />
            </button>
            <button
              onClick={() => openImagePicker("upload")}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <Image size={24} />
            </button>
            <button
              onClick={() => setStep("hashtags")}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <Hash size={24} />
            </button>
            <button className="text-gray-500 hover:text-gray-800 transition-colors">
              <MapPin size={24} />
            </button>
            <button className="text-gray-500 hover:text-gray-800 transition-colors">
              <Link2 size={24} />
            </button>
          </div>

          {(content || image || selectedHashtags.length > 0) && (
            <Button
              variant="primary"
              className="rounded-full px-6"
              onClick={handlePost}
            >
              Post
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const renderHashtagsStep = () => (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Select hashtags</h2>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {availableHashtags.map((tag) => (
          <Hashtag
            key={tag}
            tag={tag}
            selected={selectedHashtags.includes(tag)}
            onClick={() => toggleHashtag(tag)}
          />
        ))}
      </div>

      <Button
        variant="primary"
        className="w-full"
        onClick={() => setStep("content")}
      >
        Done
      </Button>
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case "category":
        return renderCategoryStep();
      case "content":
        return renderContentStep();
      case "hashtags":
        return renderHashtagsStep();
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <MobileHeader
        title={getStepTitle()}
        onBack={step === "category" ? onClose : () => setStep("category")}
      />

      <div className="flex-1 overflow-auto">{renderStepContent()}</div>

      <ImagePickerModal
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        onImageSelected={handleImageSelected}
      />
    </div>
  );
}

export default MobileCreateScoop;
