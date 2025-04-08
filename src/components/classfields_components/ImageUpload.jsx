"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/Button";
import { Upload, X, MoreHorizontal, ImageIcon, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableImage({ image, onRemove, onSetCover, onChangePicture }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group touch-manipulation"
    >
      <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <img
          src={image.url || "/placeholder.svg"}
          alt="Uploaded image"
          className="w-full h-full object-cover"
        />

        {/* Cover Image Label */}
        {image.isCover && (
          <div className="absolute top-3 left-3 bg-white text-black text-xs px-3 py-1 rounded-md font-medium shadow-sm">
            Cover Image
          </div>
        )}

        {/* Quick Remove Button */}
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white"
          onClick={() => onRemove(image.id)}
        >
          <X className="h-4 w-4" />
        </button>

        {/* Options Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 text-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {!image.isCover && (
              <DropdownMenuItem
                onClick={() => onSetCover(image.id)}
                className="cursor-pointer"
              >
                <Check className="mr-2 h-4 w-4" />
                Set as Cover
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => onChangePicture(image.id)}
              className="cursor-pointer"
            >
              <Upload className="mr-2 h-4 w-4" />
              Change Picture
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onRemove(image.id)}
              className="text-red-600 focus:text-red-600 cursor-pointer"
            >
              <X className="mr-2 h-4 w-4" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export function ImageUpload({
  category = "House",
  minPhotos = 6,
  images: externalImages,
  onChange,
}) {
  const [images, setImages] = useState(externalImages || []);
  const fileInputRef = useRef(null);
  const changeImageRef = useRef(null);

  // Sync with external state if provided
  useEffect(() => {
    if (onChange && images !== externalImages) {
      onChange(images);
    }
  }, [images, externalImages, onChange]);

  // Initialize from external images if provided
  useEffect(() => {
    if (externalImages && externalImages.length > 0 && images.length === 0) {
      setImages(externalImages);
    }
  }, [externalImages, images.length]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => ({
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
        file: file, // Store actual file for form submission
        isCover: images.length === 0 && changeImageRef.current === null,
      }));

      if (changeImageRef.current) {
        // Replace specific image
        setImages((prev) =>
          prev.map((img) =>
            img.id === changeImageRef.current
              ? { ...newImages[0], isCover: img.isCover }
              : img
          )
        );
        changeImageRef.current = null;
      } else {
        // Add new images
        setImages((prev) => {
          const updatedImages = [...prev, ...newImages];
          updatedImages.forEach((img, index) => (img.isCover = index === 0)); // Ensure first image is cover
          return updatedImages;
        });
      }
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const newImages = prev.filter((img) => img.id !== id);

      // If we removed the cover image, set the first image as cover
      if (prev.find((img) => img.id === id)?.isCover && newImages.length > 0) {
        newImages[0].isCover = true;
      }

      return newImages;
    });
  };

  const setCoverImage = (id) => {
    setImages((prev) =>
      prev.map((img, index) => ({
        ...img,
        isCover:
          img.id === id || index === prev.findIndex(({ id }) => id === id),
      }))
    );
  };

  const changePicture = (id) => {
    changeImageRef.current = id;
    fileInputRef.current?.click();
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const updatedImages = arrayMove(items, oldIndex, newIndex);
        updatedImages.forEach((img, index) => (img.isCover = index === 0)); // Ensure first image is cover
        return updatedImages;
      });
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();

    images.forEach((image, index) => {
      formData.append(`image_${index}`, image.file); // Append actual file to form data
      formData.append(`isCover_${index}`, image.isCover); // Append cover status
    });

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log("Upload successful:", data))
      .catch((error) => console.error("Upload failed:", error));
  };

  if (images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="text-lg font-medium font-fraunces">
          Add Some photos of your {category}
        </div>
        <div className="text-sm text-gray-500">
          You'll need to add at least {minPhotos} photos
        </div>

        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors p-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 mb-2 flex items-center justify-center border-2 rounded-md">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-base font-medium mb-1">+ Add Photos</p>
            <p className="text-sm text-gray-500">Browse from your computer</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
        </label>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg font-medium">Looks Great</div>
          <div className="text-sm text-gray-500">Drag to reorder</div>
        </div>
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1 rounded-full px-4 py-2 border border-gray-300 hover:bg-gray-50"
        >
          <span className="text-sm font-medium">+ Add more Image</span>
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={images.map((img) => img.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            {images.map((image) => (
              <SortableImage
                key={image.id}
                image={image}
                onRemove={removeImage}
                onSetCover={setCoverImage}
                onChangePicture={changePicture}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />

      {/* Submit Button */}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
