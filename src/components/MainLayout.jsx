"use client";

import { useState, useEffect } from "react";
import { useIsMobile } from "../hooks/use-mobile";
import LeftSidebar from "../pages/LeftSidebar";
import MobileHeader from "../pages/MobileHeader";
import BottomNavbar from "./home_components/BottomNavBar";
import MobileSidebar from "./home_components/MobileSidebar";

function MainLayout({
  children,
  rightSidebar,
  rs = true,
  onMenuClick,
  menu = false,
}) {
  // State to track viewport height for proper sidebar sizing
  const [viewportHeight, setViewportHeight] = useState("100vh");
  // State for mobile sidebar
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  // State for navbar visibility on scroll
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  // Check if we're on mobile
  const isMobile = useIsMobile();

  // Update viewport height on resize and initial load
  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(`${window.innerHeight}px`);
    };

    // Set initial height
    updateViewportHeight();

    // Add resize listener
    window.addEventListener("resize", updateViewportHeight);

    // Cleanup
    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  // Handle scroll for mobile navbar visibility
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Determine if we should show or hide based on scroll direction
      // Also, don't hide navbar when at the top of the page
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

      setPrevScrollPos(currentScrollPos);
      setIsNavbarVisible(visible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, isMobile]);

  // Mobile layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 font-afacad">
        {/* Mobile Header */}
        <MobileHeader onMenuClick={onMenuClick} menu={menu} />

        {/* Mobile Main Content */}
        <main className="pt-6 pb-20">{children}</main>

        {/* Mobile Bottom Navigation */}
        <BottomNavbar isNavbarVisible={isNavbarVisible} />

        {/* Mobile Sidebar */}
        <MobileSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="flex justify-center w-full bg-pink-50 font-afacad">
      {/* Main container with max-width for large screens */}
      <div className="grid grid-cols-12 w-full max-w-[1600px] bg-white">
        {/* Left Sidebar - reusable across all screens */}
        <LeftSidebar viewportHeight={viewportHeight} />

        {/* Middle Content Area */}
        <main
          className={`${
            rs
              ? "col-span-6 xl:col-span-6"
              : "col-span-8 lg:col-span-10 xl:col-span-10"
          } overflow-y-auto border-gray-200`}
        >
          <div className="p-4 lg:p-6 max-w-full">{children}</div>
        </main>

        {/* Right Sidebar - optional, can be different for each screen */}
        {rs && rightSidebar ? (
          <aside className="col-span-4 xl:col-span-4 hidden lg:block border-l-2 border-gray-100 overflow-y-auto h-fit">
            {rightSidebar}
          </aside>
        ) : null}
      </div>
    </div>
  );
}

export default MainLayout;
