"use client";

import { useState, useRef, useEffect } from "react";
import { X, Camera, ImageIcon, Upload } from "lucide-react";
import Button from "./Button";
import Dialog from "./Dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

function ImagePickerModal({
  isOpen,
  onClose,
  onImageSelected,
  allowMultiple = false,
}) {
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
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
    }
  };

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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

  // Take photo and convert to File object
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

        // Convert canvas to blob (File)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create a File object from the blob
              const file = new File([blob], "camera-capture.jpg", {
                type: "image/jpeg",
              });
              setSelectedFile(file);

              // Create a preview URL
              const previewUrl = URL.createObjectURL(file);
              setPreviewUrl(previewUrl);

              // Stop camera after taking photo
              stopCamera();
            }
          },
          "image/jpeg",
          0.95
        );
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

  // Confirm selection - pass the actual File object
  const confirmSelection = () => {
    if (selectedFile) {
      onImageSelected(selectedFile);
      onClose();

      // Clean up
      if (isCameraActive) {
        stopCamera();
      }

      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
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
                src={previewUrl || "/placeholder.svg"}
                alt="Preview"
                className="mb-4 rounded-md w-full h-auto"
              />
              <Button
                variant="outline"
                className="absolute top-2 right-2 bg-white/80 rounded-md"
                onClick={() => {
                  if (previewUrl && previewUrl.startsWith("blob:")) {
                    URL.revokeObjectURL(previewUrl);
                  }
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
                multiple={allowMultiple}
              />
              <div
                className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md cursor-pointer"
                onClick={triggerFileInput}
              >
                <Upload size={48} className="text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-700">
                  Drag and drop an image here
                </h3>
                <p className="mt-1 text-sm text-gray-500">or</p>
                <Button
                  variant="secondary"
                  className="mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerFileInput();
                  }}
                >
                  Select file
                </Button>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="camera" className="pt-4">
          <div className="relative">
            {!previewUrl ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full rounded-md aspect-video"
                ></video>
                <canvas ref={canvasRef} className="hidden"></canvas>

                <Button
                  variant="secondary"
                  className="absolute bottom-2 left-1/2 -translate-x-1/2"
                  onClick={takePhoto}
                >
                  Take Photo
                </Button>
              </>
            ) : (
              <div className="relative">
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="mb-4 rounded-md w-full h-auto"
                />
                <Button
                  variant="outline"
                  className="absolute top-2 right-2 bg-white/80 rounded-md"
                  onClick={() => {
                    if (previewUrl && previewUrl.startsWith("blob:")) {
                      URL.revokeObjectURL(previewUrl);
                    }
                    setPreviewUrl(null);
                    setSelectedFile(null);
                    startCamera();
                  }}
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
          disabled={!selectedFile}
        >
          Confirm
        </Button>
      </div>
    </Dialog>
  );
}

export default ImagePickerModal;
