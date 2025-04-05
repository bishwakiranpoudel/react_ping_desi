"use client";

import { useState, useRef, useEffect } from "react";
import { X, Camera, ImageIcon, Upload } from "lucide-react";
import Button from "./Button";
import Dialog from "./Dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

function ImagePickerModal({ isOpen, onClose, onImageSelected }) {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      setCameraStream(stream);
      setIsCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please check permissions.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
      setIsCameraActive(false);
    }
  };

  // Take photo
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw current video frame to canvas
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to data URL
        const imageUrl = canvas.toDataURL("image/jpeg");
        setPreviewUrl(imageUrl);

        // Stop camera after taking photo
        stopCamera();
      }
    }
  };

  // Handle tab change
  const handleTabChange = (value) => {
    setActiveTab(value);

    // Stop camera if switching away from camera tab
    if (value !== "camera" && isCameraActive) {
      stopCamera();
    }

    // Start camera if switching to camera tab
    if (value === "camera" && !isCameraActive) {
      startCamera();
    }
  };

  // Confirm selection
  const confirmSelection = () => {
    if (previewUrl) {
      onImageSelected(previewUrl);
      onClose();

      // Clean up
      if (isCameraActive) {
        stopCamera();
      }
      setPreviewUrl(null);
      setSelectedFile(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} title="Add Image">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <ImageIcon size={16} />
            Upload
          </TabsTrigger>
          <TabsTrigger value="camera" className="flex items-center gap-2">
            <Camera size={16} />
            Camera
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="pt-4">
          {previewUrl ? (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="mb-4 rounded-md w-full h-auto"
              />
              <Button
                variant="outline"
                className="absolute top-2 right-2 bg-white/80 rounded-md"
                onClick={() => {
                  setPreviewUrl(null);
                  setSelectedFile(null);
                }}
              >
                Remove
              </Button>
            </div>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
              <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md cursor-pointer">
                <Upload size={48} className="text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-700">
                  Drag and drop an image here
                </h3>
                <p className="mt-1 text-sm text-gray-500">or</p>
                <Button
                  variant="secondary"
                  className="mt-2"
                  onClick={triggerFileInput}
                >
                  Select file
                </Button>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="camera" className="pt-4">
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full rounded-md aspect-video"
            ></video>
            <canvas ref={canvasRef} className="hidden"></canvas>

            {!previewUrl && (
              <Button
                variant="secondary"
                className="absolute bottom-2 left-1/2 -translate-x-1/2"
                onClick={takePhoto}
              >
                Take Photo
              </Button>
            )}

            {previewUrl && (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mb-4 rounded-md w-full h-auto"
                />
                <Button
                  variant="outline"
                  className="absolute top-2 right-2 bg-white/80 rounded-md"
                  onClick={() => setPreviewUrl(null)}
                >
                  Retake
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-4 flex justify-end">
        <Button variant="ghost" className="mr-2" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={confirmSelection}
          disabled={!previewUrl}
        >
          Confirm
        </Button>
      </div>
    </Dialog>
  );
}

export default ImagePickerModal;
