"use client";

import { useState } from "react";
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

const categories = [
  {
    id: "restaurants",
    name: "Restaurants",
    icon: <span style={{ fontSize: "1.5rem" }}>🍽️</span>,
    description: "Discover, dine, and review.",
  },
  {
    id: "jobs",
    name: "Jobs",
    icon: <span style={{ fontSize: "1.5rem" }}>💼</span>,
    description: "Opportunities, referrals, and connections.",
  },
  {
    id: "professionals",
    name: "Professionals",
    icon: <span style={{ fontSize: "1.5rem" }}>👨‍💼</span>,
    description: "Insights, reviews, and updates.",
  },
  {
    id: "kids",
    name: "Kids",
    icon: <span style={{ fontSize: "1.5rem" }}>🧸</span>,
    description: "Fun, learning, and growth.",
  },
  {
    id: "travel",
    name: "Travel",
    icon: <span style={{ fontSize: "1.5rem" }}>🧭</span>,
    description: "Tips, adventures, and hidden gems.",
  },
  {
    id: "events",
    name: "Events",
    icon: <span style={{ fontSize: "1.5rem" }}>📅</span>,
    description: "Updates, reviews, and highlights.",
  },
  {
    id: "health",
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

  const availableHashtags = [
    ["InfoDrop", "Dine in", "Take out"],
    ["InfoDrop", "Review", "Deals"],
    ["DineIn", "TakeOut", "BYOB"],
  ];

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

  const handlePost = () => {
    // In a real app, this would send the post to the server
    console.log("Posting:", {
      content,
      category: selectedCategory?.id,
      hashtags: selectedHashtags,
      image,
    });

    // Reset form
    setContent("");
    setSelectedCategory(null);
    setSelectedHashtags([]);
    setImage(null);
  };

  const handleDoneHashtags = () => {
    setIsHashtagPopoverOpen(false);
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
          <button className="text-gray-500 hover:text-gray-800 transition-colors">
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
          >
            Post
          </Button>
        )}
      </div>

      <ImagePickerModal
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        onImageSelected={handleImageSelected}
      />
    </div>
  );
}

export default CreateScoopForm;
