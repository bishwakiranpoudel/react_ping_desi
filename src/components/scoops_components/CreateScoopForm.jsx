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
} from "lucide-react";
import Button from "./Button";
import Popover from "./Popover";
import { classNames } from "../../utils/classNames";
import ImagePickerModal from "./ImagePickerModal";
import { toast } from "react-toastify";
import { postScoops } from "../../services/scoops";

const categories = [
  {
    id: "1",
    name: "Restaurants",
    icon: <span style={{ fontSize: "1.5rem" }}>🍽️</span>,
    description: "Discover, dine, and review.",
  },
  {
    id: "2",
    name: "Jobs",
    icon: <span style={{ fontSize: "1.5rem" }}>💼</span>,
    description: "Opportunities, referrals, and connections.",
  },
  {
    id: "3",
    name: "Professionals",
    icon: <span style={{ fontSize: "1.5rem" }}>👨‍💼</span>,
    description: "Insights, reviews, and updates.",
  },
  {
    id: "4",
    name: "Kids",
    icon: <span style={{ fontSize: "1.5rem" }}>🧸</span>,
    description: "Fun, learning, and growth.",
  },
  {
    id: "5",
    name: "Travel",
    icon: <span style={{ fontSize: "1.5rem" }}>🧭</span>,
    description: "Tips, adventures, and hidden gems.",
  },
  {
    id: "6",
    name: "Events",
    icon: <span style={{ fontSize: "1.5rem" }}>📅</span>,
    description: "Updates, reviews, and highlights.",
  },
  {
    id: "7",
    name: "Health",
    icon: <span style={{ fontSize: "1.5rem" }}>🏥</span>,
    description: "Wellness, fitness, and medical advice.",
  },
];

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

function CreateScoopForm() {
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [image, setImage] = useState(null);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [imagePickerMode, setImagePickerMode] = useState("upload");
  const [isHashtagPopoverOpen, setIsHashtagPopoverOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [geohash, setGeohash] = useState("zsjs"); // Default geohash from image

  const availableHashtags = [
    ["InfoDrop", "Dine in", "Take out"],
    ["InfoDrop", "Review", "Deals"],
    ["DineIn", "TakeOut", "BYOB"],
  ];

  // Get geolocation when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would convert lat/long to geohash
          // For now, we'll use the value from the image
          setGeohash("9v6m");
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  }, []);

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

  const handlePost = async () => {
    try {
      setIsProcessing(true);

      if (!content.trim() && !image) {
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
        scoopid: selectedCategory?.id,
        hoopids: selectedHashtags,
        geohash,
      };

      console.log("Poting scoop:", scoopData);

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
      setImage(null);
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
    // For now, we'll just set the geohash from the image
    setGeohash("zsjs");
    toast.info("Location added", {
      position: "top-right",
      autoClose: 3000,
    });
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
    <div className="flex flex-col">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          onClick={() => {
            setSelectedCategory(category);
            document.body.click(); // Close the popover
          }}
        />
      ))}
    </div>
  );

  const hashtagPopoverContent = (
    <div className="p-4 flex flex-col gap-4">
      {[availableHashtags[0], availableHashtags[1], availableHashtags[2]].map(
        (group, index) => (
          <div key={index} className="flex flex-wrap gap-2">
            {group.map((tag) => (
              <Hashtag
                key={tag}
                tag={tag}
                selected={selectedHashtags.includes(tag)}
                onClick={() => toggleHashtag(tag)}
              />
            ))}
          </div>
        )
      )}
      <Button
        variant="ghost"
        className="ml-auto flex items-center gap-1 text-primary text-sm"
        onClick={handleDoneHashtags}
      >
        <Check size={16} />
        <span>Done</span>
      </Button>
    </div>
  );

  return (
    <div className="bg-white rounded-lg border p-4 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <Popover content={categoryPopoverContent} align="start">
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
          onOpenChange={setIsHashtagPopoverOpen}
        >
          <Button
            variant="outline"
            className="rounded-full flex items-center gap-2 bg-gray-100 text-gray-700"
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

      {image && (
        <div className="mb-4 relative">
          <img
            src={image || "/placeholder.svg"}
            alt="Uploaded content"
            className="w-full h-auto rounded-md"
          />
          <Button
            variant="outline"
            className="absolute top-2 right-2 bg-white/80 rounded-md"
            onClick={() => setImage(null)}
          >
            Remove
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

        {(content || image || selectedHashtags.length > 0) && (
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
      />
    </div>
  );
}

export default CreateScoopForm;
