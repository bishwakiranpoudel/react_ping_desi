"use client";

import { useState, useEffect } from "react";
import {
  Camera,
  Image,
  MapPin,
  Link2,
  ChevronDown,
  Hash,
  Check,
  X,
} from "lucide-react";
import Button from "./Button";
import Popover from "./Popover";
import { classNames } from "../../utils/classNames";
import ImagePickerModal from "./ImagePickerModal";
import { toast } from "react-toastify";
import { postScoops, getScoops, getHoops } from "../../services/scoops";

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
      {tag}
    </button>
  );
}

function CreateScoopForm() {
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [images, setImages] = useState([]); // Store multiple images
  const [imagePickerMode, setImagePickerMode] = useState("upload");
  const [isHashtagPopoverOpen, setIsHashtagPopoverOpen] = useState(false);
  const [isCategoryPopoverOpen, setIsCategoryPopoverOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [geohash, setGeohash] = useState("zsjs"); // Default geohash

  // State for API data
  const [scoops, setScoops] = useState([]);
  const [hoops, setHoops] = useState([]);
  const [availableHoops, setAvailableHoops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch scoops and hoops when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch scoops and hoops in parallel
        const [scoopsData, hoopsData] = await Promise.all([
          getScoops(),
          getHoops(),
        ]);

        setScoops(scoopsData);
        setHoops(hoopsData);

        // Group hoops for display
        const groupedHoops = groupHoopsByCategory(hoopsData);
        setAvailableHoops(groupedHoops);
      } catch (error) {
        toast.error(
          "Failed to load categories and hashtags: " + error.message,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          }
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group hoops into arrays for display
  const groupHoopsByCategory = (hoopsData) => {
    // Create groups of 6 hoops each
    const groups = [];
    for (let i = 0; i < hoopsData.length; i += 6) {
      groups.push(hoopsData.slice(i, i + 6));
    }
    return groups;
  };

  // Get geolocation when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would convert lat/long to geohash
          // For now, we'll use a default value
          setGeohash("9v6m");
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  }, []);

  // Update available hoops when selected category changes
  useEffect(() => {
    if (selectedCategory && scoops.length > 0) {
      // Find the selected scoop
      const scoop = scoops.find(
        (s) => s.scoopid.toString() === selectedCategory.id
      );

      if (scoop && scoop.hoops) {
        // Group the hoops for this scoop
        const scoopHoops = scoop.hoops.map((h) => h.hoopid);

        // Filter all hoops to only include those for this scoop
        const filteredHoops = hoops.filter((h) =>
          scoopHoops.includes(h.hoopid)
        );

        // Group the filtered hoops
        const groupedHoops = groupHoopsByCategory(filteredHoops);
        setAvailableHoops(groupedHoops);

        // Clear selected hashtags when category changes
        setSelectedHashtags([]);
      }
    }
  }, [selectedCategory, scoops, hoops]);

  const toggleHashtag = (hoop) => {
    if (selectedHashtags.some((h) => h.hoopid === hoop.hoopid)) {
      setSelectedHashtags(
        selectedHashtags.filter((h) => h.hoopid !== hoop.hoopid)
      );
    } else {
      setSelectedHashtags([...selectedHashtags, hoop]);
    }
  };

  const openImagePicker = (mode) => {
    setImagePickerMode(mode);
    setIsImagePickerOpen(true);
  };

  // Handle multiple image selection
  const handleImageSelected = (imageUrl) => {
    if (Array.isArray(imageUrl)) {
      // If we receive an array of images
      setImages([...images, ...imageUrl]);
    } else if (imageUrl) {
      // If we receive a single image
      setImages([...images, imageUrl]);
    }
  };

  // Remove a specific image
  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handlePost = async () => {
    try {
      setIsProcessing(true);

      if (!content.trim() && images.length === 0) {
        toast.error("Please enter some content or add an image", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        return;
      }

      if (!selectedCategory) {
        toast.error("Please select a category", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        return;
      }

      // Prepare the scoop data
      const scoopData = {
        contentinfo: content,
        scoopid: selectedCategory.id,
        hoopids: selectedHashtags.map((h) => h.hoopid),
        geohash,
        photopath: images,
      };

      console.log("Posting scoop:", scoopData);

      // Send data using your postScoops service
      const response = await postScoops(scoopData);

      // Show success message
      toast.success("Scoop has been posted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });

      // Reset form
      setContent("");
      setSelectedCategory(null);
      setSelectedHashtags([]);
      setImages([]);
    } catch (error) {
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
  };

  const handleDoneHashtags = () => {
    setIsHashtagPopoverOpen(false);
  };

  // Add location handler
  const handleAddLocation = () => {
    // In a real app, you would open a location picker
    // For now, we'll just set the geohash
    setGeohash("9v6m");
    toast.info("Location added", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Convert API data to category items for display
  const getCategoryItems = () => {
    if (!scoops || scoops.length === 0) {
      return [];
    }

    return scoops.map((scoop) => ({
      id: scoop.scoopid.toString(),
      name: scoop.scoopname,
      icon: <span style={{ fontSize: "1.5rem" }}>{scoop.emoji}</span>,
      description: `${scoop.scoopname} scoop`,
    }));
  };

  const CategoryItem = ({ category, onClick }) => (
    <div
      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
      onClick={onClick}
    >
      <div className="w-10 h-10 flex items-center justify-center">
        {category.icon}
      </div>
      <div>
        <div className="font-medium">{category.name}</div>
        <div className="text-sm text-gray-500">{category.description}</div>
      </div>
    </div>
  );

  const categoryPopoverContent = (
    <div className="flex flex-col max-h-[400px] overflow-y-auto">
      {isLoading ? (
        <div className="p-4 text-center">Loading categories...</div>
      ) : (
        getCategoryItems().map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onClick={() => {
              setSelectedCategory(category);
              setIsCategoryPopoverOpen(false);
            }}
          />
        ))
      )}
    </div>
  );

  const hashtagPopoverContent = (
    <div className="p-4 flex flex-col gap-4 max-h-[400px] overflow-y-auto">
      {isLoading ? (
        <div className="text-center">Loading hashtags...</div>
      ) : availableHoops.length === 0 ? (
        <div className="text-center">Please select a category first</div>
      ) : (
        <>
          {availableHoops.map((group, index) => (
            <div key={index} className="flex flex-wrap gap-2">
              {group.map((hoop) => (
                <Hashtag
                  key={hoop.hoopid}
                  tag={hoop.hooptag}
                  selected={selectedHashtags.some(
                    (h) => h.hoopid === hoop.hoopid
                  )}
                  onClick={() => toggleHashtag(hoop)}
                />
              ))}
            </div>
          ))}
          <Button
            variant="ghost"
            className="ml-auto flex items-center gap-1 text-primary text-sm"
            onClick={handleDoneHashtags}
          >
            <Check size={16} />
            <span>Done</span>
          </Button>
        </>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-lg border p-4 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Popover
          content={categoryPopoverContent}
          align="start"
          open={isCategoryPopoverOpen}
          onOpenChange={setIsCategoryPopoverOpen}
        >
          <Button
            variant="outline"
            className="rounded-full flex items-center gap-2 bg-gray-100 text-gray-700"
          >
            <div className="w-6 h-6 rounded-full bg-gray-700 text-white flex items-center justify-center">
              <Hash size={14} />
            </div>
            <span>
              {selectedCategory ? selectedCategory.name : "Select a scoop"}
            </span>
            <ChevronDown size={16} />
          </Button>
        </Popover>
        <Popover
          content={hashtagPopoverContent}
          align="start"
          open={isHashtagPopoverOpen}
          onOpenChange={(open) => {
            // Only allow opening if a category is selected
            if (open && !selectedCategory) {
              return;
            }
            setIsHashtagPopoverOpen(open);
          }}
        >
          <Button
            variant="outline"
            className="rounded-full flex items-center gap-2 bg-gray-100 text-gray-700"
            disabled={!selectedCategory}
          >
            <div className="w-6 h-6 rounded-full bg-gray-700 text-white flex items-center justify-center">
              <Hash size={14} />
            </div>
            <span>Add Hoop</span>
            <ChevronDown size={16} />
          </Button>
        </Popover>
      </div>

      <div className="mb-4">
        <textarea
          className="w-full p-2 min-h-[100px] border-none outline-none resize-none"
          placeholder="What's in your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      {/* Display multiple images */}
      {images.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-2">
          {images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img || "/placeholder.svg"}
                alt={`Uploaded content ${index + 1}`}
                className="w-full h-auto rounded-md object-cover aspect-square"
              />
              <button
                className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
                onClick={() => removeImage(index)}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedHashtags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedHashtags.map((hoop) => (
            <Hashtag
              key={hoop.hoopid}
              tag={hoop.hooptag}
              selected
              onClick={() => toggleHashtag(hoop)}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => openImagePicker("camera")}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <Camera size={20} />
          </button>
          <button
            onClick={() => openImagePicker("upload")}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <Image size={20} />
          </button>
          <button
            onClick={handleAddLocation}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            <MapPin size={20} />
          </button>
          <button className="text-gray-500 hover:text-gray-800 transition-colors">
            <Link2 size={20} />
          </button>
        </div>

        {(content || images.length > 0 || selectedHashtags.length > 0) && (
          <Button
            variant="primary"
            className="rounded-full px-6 bg-black text-white"
            onClick={handlePost}
            disabled={isProcessing}
          >
            {isProcessing ? "Posting..." : "Post"}
          </Button>
        )}
      </div>

      <ImagePickerModal
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        onImageSelected={handleImageSelected}
        mode={imagePickerMode}
        allowMultiple={true}
      />
    </div>
  );
}

export default CreateScoopForm;
