"use client";

import { useState } from "react";
import CreateScoopForm from "../components/scoops_components/CreateScoopForm";
import MobileCreateScoop from "../components/scoops_components/MobileCreateScoop";
import { useIsMobile } from "../hooks/use-mobile";
import MainLayout from "../components/MainLayout";
import FloatingActionButton from "../components/scoops_components/FAB";
import HomeRightSidebar from "../components/home_components/HomeRightSidebar";
import { postScoops } from "../services/scoops";
import { toast } from "react-toastify";
import SocialPostCard from "../components/home_components/SocialPostCard";

function ScoopsPage() {
  const isMobile = useIsMobile();
  const [showMobileCreate, setShowMobileCreate] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const geohash = localStorage.getItem("geohash") || "9v6m";

  const handleMobilePost = async (data) => {
    try {
      setIsProcessing(true);

      if (!data.content?.trim() && (!data.images || !data.images.length)) {
        toast.error("Please enter some content or add an image", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        return;
      }

      if (!data.category) {
        toast.error("Please select a category", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        return;
      }

      const formData = new FormData();
      formData.append("contentinfo", data.content);
      formData.append("scoopid", data.category);
      formData.append("geohash", geohash);

      const hoopids = data.hashtags.map((hashtag) => hashtag.hoopid);
      formData.append("hoopids", JSON.stringify(hoopids));

      if (data.images && data.images.length > 0) {
        data.images.forEach((image, index) => {
          if (index < 2 && image instanceof File) {
            formData.append("photopath", image);
          }
        });
      }

      const response = await postScoops(formData);

      toast.success("Scoop has been posted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });

      setShowMobileCreate(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to post scoop";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (isMobile) {
    if (showMobileCreate) {
      return (
        <MainLayout>
          <div className="min-h-screen flex flex-col">
            <MobileCreateScoop
              onClose={() => setShowMobileCreate(false)}
              onPost={handleMobilePost}
              isProcessing={isProcessing}
            />
          </div>
        </MainLayout>
      );
    }

    return (
      <MainLayout>
        <div className="min-h-screen">
          <div style={{ padding: "1rem" }}></div>
          <FloatingActionButton
            onClick={() => setShowMobileCreate(true)}
            disabled={isProcessing}
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout rightSidebar={!isMobile ? <HomeRightSidebar /> : null}>
      <CreateScoopForm />
    </MainLayout>
  );
}

export default ScoopsPage;
