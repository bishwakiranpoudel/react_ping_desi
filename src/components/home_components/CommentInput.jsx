"use client";

import { useState, useRef } from "react";
import { Image, ArrowUp } from "lucide-react";

const CommentInput = ({ onSubmit, replyingTo }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = () => {
    if (text.trim() || image) {
      onSubmit(text, image);
      setText("");
      setImage(null);
    }
  };

  const handleImageSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative w-full">
      {replyingTo && (
        <div className="text-xs text-gray-500 mb-1 ml-2">
          Replying to @{replyingTo}
        </div>
      )}

      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full">
        <input
          type="text"
          placeholder="Leave a reply..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-sm"
        />

        <div className="flex items-center space-x-2">
          <button
            className="text-gray-500 p-2 rounded-full hover:bg-gray-200 transition"
            onClick={() => fileInputRef.current.click()}
          >
            <Image size={20} />
          </button>

          <button
            className={`bg-black text-white p-2 rounded-full flex items-center justify-center w-9 h-9 ${
              !text.trim() && !image
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-800"
            } transition`}
            onClick={handleSubmit}
            disabled={!text.trim() && !image}
          >
            <ArrowUp size={20} />
          </button>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageSelect}
          accept="image/*"
          className="hidden"
        />
      </div>

      {image && (
        <div className="absolute bottom-full left-0 right-0 bg-white rounded-lg p-2 mb-2 shadow-md">
          <img
            src={image || "/placeholder.svg"}
            alt="Preview"
            className="w-full max-h-48 object-contain rounded-lg"
          />
          <button
            className="absolute top-1 right-1 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center"
            onClick={() => setImage(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentInput;
