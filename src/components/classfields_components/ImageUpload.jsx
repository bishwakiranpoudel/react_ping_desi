"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "./ui/Button"
import { Upload, X, MoreHorizontal, ImageIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/DropdownMenu"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

function SortableImage({ image, onRemove, onSetCover, onChangePicture }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative group touch-manipulation">
      <div className="relative w-full h-40 rounded-md overflow-hidden border">
        <img src={image.url || "/placeholder.svg"} alt="Uploaded image" className="w-full h-full object-cover" />
        {image.isCover && (
          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">Cover Image</div>
        )}
      </div>
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onRemove(image.id)}
      >
        <X className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!image.isCover && (
            <DropdownMenuItem onClick={() => onSetCover(image.id)}>
              <ImageIcon className="mr-2 h-4 w-4" />
              Set as Cover
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => onChangePicture(image.id)}>
            <Upload className="mr-2 h-4 w-4" />
            Change Picture
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onRemove(image.id)} className="text-red-600 focus:text-red-600">
            <X className="mr-2 h-4 w-4" />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function ImageUpload({ category = "House", minPhotos = 6, images: externalImages, onChange }) {
  const [images, setImages] = useState(externalImages || [])
  const fileInputRef = useRef(null)
  const changeImageRef = useRef(null)

  // Sync with external state if provided
  useEffect(() => {
    if (onChange && images !== externalImages) {
      onChange(images)
    }
  }, [images, externalImages, onChange])

  // Initialize from external images if provided
  useEffect(() => {
    if (externalImages && externalImages.length > 0 && images.length === 0) {
      setImages(externalImages)
    }
  }, [externalImages, images.length])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map((file) => ({
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
        isCover: images.length === 0 && changeImageRef.current === null,
      }))

      if (changeImageRef.current) {
        // Replace specific image
        setImages((prev) =>
          prev.map((img) => (img.id === changeImageRef.current ? { ...newImages[0], isCover: img.isCover } : img)),
        )
        changeImageRef.current = null
      } else {
        // Add new images
        setImages((prev) => {
          const updatedImages = [...prev, ...newImages]
          // If this is the first image, make it the cover
          if (prev.length === 0 && updatedImages.length > 0) {
            updatedImages[0].isCover = true
          }
          return updatedImages
        })
      }
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeImage = (id) => {
    setImages((prev) => {
      const newImages = prev.filter((img) => img.id !== id)

      // If we removed the cover image, set the first image as cover
      if (prev.find((img) => img.id === id)?.isCover && newImages.length > 0) {
        newImages[0].isCover = true
      }

      return newImages
    })
  }

  const setCoverImage = (id) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isCover: img.id === id,
      })),
    )
  }

  const changePicture = (id) => {
    changeImageRef.current = id
    fileInputRef.current?.click()
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  if (images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="text-lg font-medium">Add Some photos of your {category}</div>
        <div className="text-sm text-gray-500">You'll need to add at least {minPhotos} photos</div>

        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md cursor-pointer hover:bg-[#f2e8f5] transition-colors p-6">
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
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg font-medium">Looks Great</div>
          <div className="text-sm text-gray-500">Drag to reorder</div>
        </div>
        <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1">
          <span className="text-lg">+</span> Add more Image
        </Button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={images.map((img) => img.id)} strategy={verticalListSortingStrategy}>
          <div className="grid grid-cols-2 gap-4">
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

      <input ref={fileInputRef} type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
    </div>
  )
}

