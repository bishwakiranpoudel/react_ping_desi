"use client";

import { useState, useEffect, useRef } from "react";
import {
  Camera,
  ImageIcon,
  MapPin,
  Link2,
  Hash,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";
import Button from "./Button";
import MobileHeader from "./MobileHeader";
import { classNames } from "../../utils/classNames";
import ImagePickerModal from "./ImagePickerModal";
import { getScoops, getHoops } from "../../services/scoops";
import { toast } from "react-toastify"; // Add this import

function Hashtag({ tag, onClick, selected }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "px-3 py-1 rounded-full text-sm font-medium",
        selected
          ? "bg-black text-white"
          : "border text-black hover:bg-gray-800 hover:text-white"
      )}
    >
      {tag}
    </button>
  );
}

function ImagePreview({ src, onRemove }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative rounded-md overflow-hidden border border-gray-200 h-32 w-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-2">
          <AlertCircle className="h-6 w-6 text-red-500 mb-1" />
          <p className="text-xs text-gray-600 text-center">Failed to load</p>
        </div>
      )}

      <img
        src={src || "/placeholder.svg"}
        alt="Uploaded content"
        className={classNames(
          "w-full h-full object-cover",
          isLoading || hasError ? "opacity-0" : "opacity-100"
        )}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />

      {/* Improved close button with better positioning and visibility */}
      <button
        className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70 transition-colors"
        onClick={onRemove}
      >
        <X size={16} />
      </button>
    </div>
  );
}

function MobileCreateScoop({ onClose, onPost, isProcessing = false }) {
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [images, setImages] = useState([]);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [imagePickerMode, setImagePickerMode] = useState("upload");
  const [step, setStep] = useState("category");
  const [showMaxImagesWarning, setShowMaxImagesWarning] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_IMAGES = 2;

  // State for API data
  const [scoops, setScoops] = useState([]);
  const [allHoops, setAllHoops] = useState([]);
  const [categoryHoops, setCategoryHoops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to group hoops by category
  const groupHoopsByCategory = (hoops, scoopsData) => {
    const result = {};

    // Initialize empty arrays for each scoop
    scoopsData.forEach((scoop) => {
      result[scoop.scoopid] = [];
    });

    // Group hoops by scoopid if they exist in the scoops
    scoopsData.forEach((scoop) => {
      if (scoop.hoops && Array.isArray(scoop.hoops)) {
        result[scoop.scoopid] = scoop.hoops;
      }
    });

    return result;
  };

  // Fetch scoops and hoops when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch scoops and hoops in parallel
        const [scoopsData, hoopsData] = await Promise.all([
          getScoops(),
          getHoops(),
        ]);

        setScoops(scoopsData);
        setAllHoops(hoopsData);

        // No need to call groupHoopsByCategory here since scoops already have their hoops
        setError(null);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load categories and hashtags. Please try again.");

        // Use toast if available, otherwise just log to console
        if (typeof toast !== "undefined") {
          toast.error(
            "Failed to load categories and hashtags: " + err.message,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
            }
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hide max images warning after 3 seconds
  useEffect(() => {
    if (showMaxImagesWarning) {
      const timer = setTimeout(() => {
        setShowMaxImagesWarning(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showMaxImagesWarning]);

  // Update available hashtags when category changes
  useEffect(() => {
    if (selectedCategory) {
      const selectedScoop = scoops.find(
        (scoop) => scoop.scoopid === selectedCategory
      );
      if (selectedScoop && selectedScoop.hoops) {
        setCategoryHoops(selectedScoop.hoops);
      } else {
        setCategoryHoops([]);
      }
    }
  }, [selectedCategory, scoops]);

  const toggleHashtag = (hoopTag) => {
    if (selectedHashtags.includes(hoopTag)) {
      setSelectedHashtags(selectedHashtags.filter((t) => t !== hoopTag));
    } else {
      setSelectedHashtags([...selectedHashtags, hoopTag]);
    }
  };

  const openImagePicker = (mode) => {
    if (images.length >= MAX_IMAGES) {
      setShowMaxImagesWarning(true);
      return;
    }
    setImagePickerMode(mode);
    setIsImagePickerOpen(true);
  };

  const handleImageSelected = (imageData) => {
    // Check if we've reached the maximum number of images
    if (images.length >= MAX_IMAGES) {
      setShowMaxImagesWarning(true);
      setIsImagePickerOpen(false);
      return;
    }

    // Handle both URL strings and File objects
    if (typeof imageData === "string") {
      // If it's a URL string
      setImages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          url: imageData,
          type: "url",
        },
      ]);
    } else if (imageData instanceof File) {
      // If it's a File object
      const imageUrl = URL.createObjectURL(imageData);
      setImages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          url: imageUrl,
          file: imageData,
          type: "file",
        },
      ]);
    } else if (imageData && imageData.url) {
      // If it's an object with a url property
      setImages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          ...imageData,
          type: imageData.file ? "file" : "url",
        },
      ]);
    }

    setIsImagePickerOpen(false);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      // Check if adding these files would exceed the limit
      if (images.length + e.target.files.length > MAX_IMAGES) {
        setShowMaxImagesWarning(true);
        // Only add files up to the maximum
        const remainingSlots = MAX_IMAGES - images.length;
        if (remainingSlots <= 0) {
          return;
        }

        // Only process the first remainingSlots files
        Array.from(e.target.files)
          .slice(0, remainingSlots)
          .forEach((file) => {
            if (file.type.startsWith("image/")) {
              const imageUrl = URL.createObjectURL(file);
              setImages((prev) => [
                ...prev,
                {
                  id: crypto.randomUUID(),
                  url: imageUrl,
                  file: file,
                  type: "file",
                },
              ]);
            }
          });
      } else {
        // Add all files if we're under the limit
        Array.from(e.target.files).forEach((file) => {
          if (file.type.startsWith("image/")) {
            const imageUrl = URL.createObjectURL(file);
            setImages((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                url: imageUrl,
                file: file,
                type: "file",
              },
            ]);
          }
        });
      }
    }
    // Reset the input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (imageId) => {
    setImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === imageId);

      // Revoke object URL if it was created with URL.createObjectURL
      if (imageToRemove && imageToRemove.type === "file" && imageToRemove.url) {
        URL.revokeObjectURL(imageToRemove.url);
      }

      return prev.filter((img) => img.id !== imageId);
    });
  };

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setStep("content");
    // Reset hashtags when changing category
    setSelectedHashtags([]);
  };

  const handlePost = () => {
    // Extract file objects from images for submission
    const imageFiles = images
      .filter((img) => img.file instanceof File)
      .map((img) => img.file);

    // Get hoopids from selected hashtags
    const hoopIds = selectedHashtags.map((tag) => {
      // Find the hoop object that matches this tag
      const hoop = categoryHoops.find((h) => h.hooptag === tag);
      // Return the full hoop object so the parent component has all the data
      return hoop || { hooptag: tag };
    });

    onPost({
      content,
      category: selectedCategory,
      hashtags: hoopIds,
      images: imageFiles,
    });

    // Clean up object URLs
    images.forEach((img) => {
      if (img.type === "file" && img.url) {
        URL.revokeObjectURL(img.url);
      }
    });
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.type === "file" && img.url) {
          URL.revokeObjectURL(img.url);
        }
      });
    };
  }, []);

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

  const renderCategoryStep = () => {
    if (loading) {
      return (
        <div className="p-4 flex flex-col items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-gray-500">Loading categories...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 flex flex-col items-center justify-center h-64">
          <p className="text-red-500 mb-4">{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      );
    }

    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Select a category</h2>
        <div className="grid gap-3">
          {scoops.map((scoop) => (
            <button
              key={scoop.scoopid}
              className={classNames(
                "flex items-center gap-3 p-3 rounded-md border cursor-pointer",
                scoop.scoopid === selectedCategory
                  ? "border-primary"
                  : "border-gray-200"
              )}
              onClick={() => handleSelectCategory(scoop.scoopid)}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100">
                <span className="text-xl">
                  <img
                    src={`/scoops/${scoop.scoopname.toLowerCase()}.png`}
                    alt="Ping Desi logo"
                    width={20}
                    height={20}
                    className="object-contain "
                  />
                </span>
              </div>
              <span className="font-medium">{scoop.scoopname}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderContentStep = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 flex-1">
        <div className="mb-4">
          <textarea
            placeholder="What's in your mind?"
            className="w-full p-2 min-h-[150px] border-none outline-none resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isProcessing}
          />
        </div>

        {/* Max images warning message */}
        {showMaxImagesWarning && (
          <div className="mb-4 p-2 bg-amber-50 border border-amber-200 rounded-md text-amber-700 text-sm">
            You can only upload a maximum of {MAX_IMAGES} images.
          </div>
        )}

        {/* Horizontal image layout */}
        {images.length > 0 && (
          <div className="mb-4">
            <div className="flex gap-2">
              {images.map((image) => (
                <div key={image.id} className="flex-1">
                  <ImagePreview
                    src={image.url || "/placeholder.svg"}
                    onRemove={() => !isProcessing && removeImage(image.id)}
                  />
                </div>
              ))}

              {/* Empty placeholder to maintain grid when only one image */}
              {images.length === 1 && <div className="flex-1"></div>}
            </div>
            <p className="text-xs text-gray-500 mt-1 text-right">
              {images.length}/{MAX_IMAGES} images
            </p>
          </div>
        )}

        {selectedHashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedHashtags.map((tag) => (
              <Hashtag
                key={tag}
                tag={tag}
                selected
                onClick={() => !isProcessing && toggleHashtag(tag)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => !isProcessing && openImagePicker("camera")}
              className={classNames(
                "transition-colors",
                isProcessing || images.length >= MAX_IMAGES
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:text-gray-800"
              )}
              disabled={isProcessing || images.length >= MAX_IMAGES}
            >
              <Camera size={24} />
            </button>
            <label
              className={classNames(
                "cursor-pointer",
                isProcessing || images.length >= MAX_IMAGES
                  ? "cursor-not-allowed"
                  : ""
              )}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleFileInputChange}
                disabled={isProcessing || images.length >= MAX_IMAGES}
              />
              <ImageIcon
                size={24}
                className={classNames(
                  "transition-colors",
                  isProcessing || images.length >= MAX_IMAGES
                    ? "text-gray-300"
                    : "text-gray-500 hover:text-gray-800"
                )}
              />
            </label>
            <button
              onClick={() => !isProcessing && setStep("hashtags")}
              className={classNames(
                "transition-colors",
                isProcessing
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:text-gray-800"
              )}
              disabled={isProcessing}
            >
              <Hash size={24} />
            </button>
            <button
              className={classNames(
                "transition-colors",
                isProcessing
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:text-gray-800"
              )}
              disabled={isProcessing}
            >
              <MapPin size={24} />
            </button>
            <button
              className={classNames(
                "transition-colors",
                isProcessing
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:text-gray-800"
              )}
              disabled={isProcessing}
            >
              <Link2 size={24} />
            </button>
          </div>

          {(content || images.length > 0 || selectedHashtags.length > 0) && (
            <Button
              variant="primary"
              className="rounded-full px-6"
              onClick={handlePost}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Posting...
                </>
              ) : (
                "Post"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const renderHashtagsStep = () => {
    if (categoryHoops.length === 0) {
      return (
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">No hashtags available</h2>
          <p className="text-gray-500 mb-6">
            This category doesn't have any hashtags.
          </p>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => setStep("content")}
            disabled={isProcessing}
          >
            Back to Content
          </Button>
        </div>
      );
    }

    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Select hashtags</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categoryHoops.map((hoop) => (
            <Hashtag
              key={hoop.hoopid}
              tag={hoop.hooptag}
              selected={selectedHashtags.includes(hoop.hooptag)}
              onClick={() => !isProcessing && toggleHashtag(hoop.hooptag)}
            />
          ))}
        </div>

        <Button
          variant="primary"
          className="w-full"
          onClick={() => setStep("content")}
          disabled={isProcessing}
        >
          Done
        </Button>
      </div>
    );
  };

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
        disabled={isProcessing}
      />

      <div className="flex-1 overflow-auto">
        {isProcessing && step !== "content" && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-sm text-gray-600">Posting your scoop...</p>
            </div>
          </div>
        )}
        {renderStepContent()}
      </div>

      <ImagePickerModal
        isOpen={isImagePickerOpen && !isProcessing}
        onClose={() => setIsImagePickerOpen(false)}
        onImageSelected={handleImageSelected}
        mode={imagePickerMode}
      />
    </div>
  );
}

export default MobileCreateScoop;
