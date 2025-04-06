"use client";

import { useState } from "react";
import CreateScoopForm from "../components/scoops_components/CreateScoopForm";
import MobileCreateScoop from "../components/scoops_components/MobileCreateScoop";
import { useIsMobile } from "../hooks/use-mobile";
import MainLayout from "../components/MainLayout";
import FloatingActionButton from "../components/scoops_components/FAB";
import HomeRightSidebar from "../components/home_components/HomeRightSidebar";

function ScoopsPage() {
  const isMobile = useIsMobile();
  const [showMobileCreate, setShowMobileCreate] = useState(false);

  const handleMobilePost = (data) => {
    console.log("Mobile post:", data);
    setShowMobileCreate(false);
  };

  if (isMobile) {
    if (showMobileCreate) {
      return (
        <MainLayout>
          <div className="min-h-screen flex flex-col">
            <MobileCreateScoop
              onClose={() => setShowMobileCreate(false)}
              onPost={handleMobilePost}
            />
          </div>
        </MainLayout>
      );
    }

    return (
      <MainLayout>
        <div className="min-h-screen">
          {/* Content goes here */}
          <div style={{ padding: "1rem" }}></div>

          {/* Floating Action Button */}

          <FloatingActionButton onClick={() => setShowMobileCreate(true)} />
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
