"use client";

import { X, Upload, ImageIcon } from "lucide-react";
import { useState } from "react";

function ImagePickerDialog({ onClose, onImageSelected }) {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (previewImage) {
      onImageSelected(previewImage);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fadeIn">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold">Choose a Profile Picture</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {previewImage ? (
            <div className="flex flex-col items-center justify-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#7B189F] mb-4">
                <img
                  src={previewImage || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Preview of your new profile picture
              </p>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                dragActive ? "border-[#7B189F] bg-[#F9F0FF]" : "border-gray-300"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <ImageIcon size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">
                  Drag and drop your image here
                </p>
                <p className="text-sm text-gray-500 mb-4">or</p>
                <label className="cursor-pointer bg-[#7B189F] hover:bg-[#6A1587] text-white rounded-full px-4 py-2 flex items-center gap-1">
                  <Upload size={16} />
                  <span>Choose File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-4">
                  Supported formats: JPG, PNG, GIF
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 p-4 border-t border-gray-100">
          <button
            className="bg-white border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`bg-[#7B189F] hover:bg-[#6A1587] text-white rounded-full px-4 py-2 ${
              !previewImage ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={!previewImage}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImagePickerDialog;
