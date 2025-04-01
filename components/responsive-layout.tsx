"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Home,
  MessageSquare,
  FileText,
  User,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Heart,
  MessageCircle,
  ThumbsDown,
  X,
  Menu,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/hooks/use-mobile"
import { TabbedContent } from "@/components/tabbed-content"

export default function ResponsiveLayout() {
  // State to track viewport height for proper sidebar sizing
  const [viewportHeight, setViewportHeight] = useState("100vh")
  // State to track visibility of the first card
  const [isFirstCardVisible, setIsFirstCardVisible] = useState(true)
  // State to track visibility of the second card
  const [isSecondCardVisible, setIsSecondCardVisible] = useState(false)
  // State for mobile sidebar
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  // Check if we're on mobile
  const isMobile = useIsMobile()

  // Add these new state variables after the existing state declarations
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)

  // Function to handle close button click
  const handleCloseClick = () => {
    setIsFirstCardVisible(false)
    setIsSecondCardVisible(true)
  }

  // Update viewport height on resize and initial load
  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(`${window.innerHeight}px`)
    }

    // Set initial height
    updateViewportHeight()

    // Add resize listener
    window.addEventListener("resize", updateViewportHeight)

    // Cleanup
    return () => window.removeEventListener("resize", updateViewportHeight)
  }, [])

  // Add this new useEffect for scroll handling in the mobile view
  useEffect(() => {
    if (!isMobile) return

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset

      // Determine if we should show or hide based on scroll direction
      // Also, don't hide navbar when at the top of the page
      const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10

      setPrevScrollPos(currentScrollPos)
      setIsNavbarVisible(visible)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos, isMobile])

  // Mobile layout
  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <header
          className="fixed top-0 left-0 right-0 bg-white z-30 border-b"
          style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
        >
          <div className="flex items-center p-4">
            <button onClick={() => setIsMobileSidebarOpen(true)} className="mr-3">
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <div className="h-8 w-8 bg-purple-500 rounded-md flex items-center justify-center mr-2">
                <span className="text-white text-xl">✿</span>
              </div>
              <div>
                <div className="font-semibold">Los Angeles</div>
                <div className="text-sm text-gray-500">Cesar Chavez Avenue</div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Main Content */}
        <main className="pt-[72px] pb-20">
          <div className="p-4">
            {/* First Card - Initially visible with close button */}
            {isFirstCardVisible && (
              <div className="border rounded-lg p-4 shadow-sm bg-[#F2F5EB] relative mb-4">
                <button
                  onClick={handleCloseClick}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                <h3 className="font-medium mb-2">New Notification Card</h3>
                <p className="text-gray-600 text-sm">
                  This is a notification card that can be dismissed. Click the X button in the top right corner to see
                  the second card.
                </p>
              </div>
            )}

            {/* Second Card - Initially invisible, appears when first card is closed */}
            {isSecondCardVisible && (
              <div className="border rounded-lg p-4 shadow-sm bg-[#F2F5EB] h-[380px] flex flex-col justify-center items-center mb-4">
                <h3 className="font-medium mb-4 text-lg">Expanded Content Card</h3>
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-2xl">✿</span>
                </div>
                <p className="text-gray-600 text-center max-w-md">
                  This larger card appears after dismissing the notification. It provides more space for content and can
                  be used for featured information or promotions.
                </p>
              </div>
            )}
            <TabbedContent />

            <section className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">Local Buzz</h2>
                <a href="#" className="text-sm text-gray-600 flex items-center">
                  Explore More <span className="ml-1">→</span>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative h-32 w-full">
                    <img
                      src="/placeholder.svg?height=128&width=200"
                      alt="Farmers Market"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center mb-1">
                      <div className="h-5 w-5 bg-purple-600 rounded flex items-center justify-center mr-1.5">
                        <span className="text-white text-xs">V</span>
                      </div>
                      <span className="text-xs text-gray-500">The Verge</span>
                    </div>
                    <h3 className="font-medium text-sm leading-tight">Local Farmers' Market Extends Weekly Hours</h3>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative h-32 w-full">
                    <img
                      src="/placeholder.svg?height=128&width=200"
                      alt="Festival Float"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center mb-1">
                      <div className="h-5 w-5 bg-black rounded flex items-center justify-center mr-1.5">
                        <span className="text-white text-xs">T</span>
                      </div>
                      <span className="text-xs text-gray-500">The New York Times</span>
                    </div>
                    <h3 className="font-medium text-sm leading-tight">Road Closures Announced for Upcoming Festival</h3>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">Scoops Around You</h2>
                <a href="#" className="text-xs text-gray-600 flex items-center">
                  View all <span className="ml-1">→</span>
                </a>
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-200 rounded-full mr-3 overflow-hidden">
                        <img
                          src="/placeholder.svg?height=40&width=40"
                          alt="Aarav Patel"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">Aarav Patel</div>
                        <div className="text-xs text-gray-500">@AaravAdventures · 9h ago</div>
                      </div>
                    </div>
                    <button className="text-gray-400">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-3">
                    <span className="inline-block bg-black text-white text-xs px-3 py-1 rounded-full mb-2">
                      Classified
                    </span>
                    <h3 className="font-medium mb-1">🏠 Roommate Wanted!</h3>
                    <p className="text-sm text-gray-700">
                      Looking for a friendly and responsible roommate to share a 2BHK apartment in Downtown Los Angeles.
                      The room is spacious, well-lit and comes fully furnished with a queen bed, desk, and wardrobe.
                      Rent is $800/month, utilities split equally.
                    </p>
                    <div className="mt-2">
                      <button className="text-sm text-purple-600 font-medium">Read more</button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                        #Roommate
                      </span>
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                        #Rent
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-500">
                        <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                        <span className="ml-1 text-sm">12</span>
                      </button>
                      <button className="flex items-center text-gray-500">
                        <MessageCircle className="h-5 w-5" />
                      </button>
                    </div>
                    <button className="flex items-center text-gray-500 text-xs">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      Nahh! Pass
                    </button>
                  </div>
                </div>
                <div className="flex justify-center py-2">
                  <div className="flex space-x-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-600"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">Happening Near You</h2>
                <a href="#" className="text-xs text-gray-600 flex items-center">
                  View all <span className="ml-1">→</span>
                </a>
              </div>
              <div className="overflow-x-auto pb-2">
                <div className="flex space-x-4" style={{ minWidth: "min-content" }}>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden w-[280px] flex-shrink-0">
                    <div className="relative h-40 w-full">
                      <img
                        src="/placeholder.svg?height=160&width=280"
                        alt="Gender Reveal Party"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-sm">
                        👨‍👩‍👧‍👦 Community
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">Our Gender Reveal Party</h3>
                      <p className="text-xs text-gray-600 mt-1 mb-2">
                        Join us as we reveal the exciting news and celebrate with family and friends!
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium">11:00 AM</div>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" /> Cesar Chavez Avenue
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="text-center bg-gray-100 rounded-sm p-1 w-10">
                            <div className="text-lg font-bold">13</div>
                            <div className="text-xs">Nov</div>
                            <div className="text-xs">2024</div>
                          </div>
                        </div>
                      </div>
                      <button className="mt-3 w-full py-1.5 bg-white border border-gray-300 text-gray-800 rounded-md text-sm">
                        Get Direction
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm overflow-hidden w-[280px] flex-shrink-0">
                    <div className="relative h-40 w-full">
                      <img
                        src="/placeholder.svg?height=160&width=280"
                        alt="Another Event"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-sm">
                        🎭 Entertainment
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">Storytelling Night</h3>
                      <p className="text-xs text-gray-600 mt-1 mb-2">
                        Join us for an evening of traditional Desi stories and folklore with community members.
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium">7:00 PM</div>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" /> Community Center
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="text-center bg-gray-100 rounded-sm p-1 w-10">
                            <div className="text-lg font-bold">15</div>
                            <div className="text-xs">Nov</div>
                            <div className="text-xs">2024</div>
                          </div>
                        </div>
                      </div>
                      <button className="mt-3 w-full py-1.5 bg-white border border-gray-300 text-gray-800 rounded-md text-sm">
                        Get Direction
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">Just for You</h2>
              </div>
              <div className="relative">
                <div className="bg-[#f5f0e8] rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 flex items-center">
                    <div className="w-1/3">
                      <img
                        src="/placeholder.svg?height=100&width=100"
                        alt="VR Headset"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="w-2/3 pl-4">
                      <div className="text-red-500 text-xs font-medium mb-1">LIMITED SALE</div>
                      <h3 className="font-bold text-gray-800 text-sm leading-tight mb-4">
                        EXPERIENCE THE SENSATION OF VIRTUAL REALITY.
                      </h3>
                      <div className="flex justify-end">
                        <button className="text-xs bg-transparent text-gray-700 font-medium">View Deals</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center py-2">
                  <div className="flex space-x-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-600"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-300"></div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div
          className={`fixed bottom-0 left-0 right-0 bg-white border-t z-40 transition-transform duration-300 ${
            isNavbarVisible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="flex justify-around items-center h-16 px-2">
            <a href="/" className="flex flex-col items-center justify-center text-purple-600">
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </a>
            <a href="/discover" className="flex flex-col items-center justify-center text-gray-500">
              <Search className="h-5 w-5" />
              <span className="text-xs mt-1">Discover</span>
            </a>
            <a href="/scoops" className="flex flex-col items-center justify-center text-gray-500">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs mt-1">Scoops</span>
            </a>
            <a href="/classifieds" className="flex flex-col items-center justify-center text-gray-500">
              <FileText className="h-5 w-5" />
              <span className="text-xs mt-1">Classifieds</span>
            </a>
            <a href="/profile" className="flex flex-col items-center justify-center text-gray-500">
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Profile</span>
            </a>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-full w-[280px] bg-white shadow-lg flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white">✿</span>
                </div>
                <div className="ml-2">
                  <div className="font-semibold">Los Angeles</div>
                  <div className="text-sm text-gray-500 flex items-center">
                    Cesar Chavez Avenue <ChevronDown className="h-3 w-3 ml-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 py-4">
              <div className="space-y-1 px-3">
                <a href="#" className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100">
                  <Home className="h-5 w-5 text-gray-500" />
                  <span>Home</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100">
                  <Search className="h-5 w-5 text-gray-500" />
                  <span>Discover</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100">
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                  <span>Scoops</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span>Classifieds</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100">
                  <User className="h-5 w-5 text-gray-500" />
                  <span>Profile</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100">
                  <MoreHorizontal className="h-5 w-5 text-gray-500" />
                  <span>More</span>
                </a>
              </div>
            </nav>

            {/* Sidebar Promotion */}
            <div className="p-4 border-t mt-auto">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-xs">✿</span>
                  </div>
                  <span className="text-sm text-purple-600 font-medium">Ping Desi</span>
                </div>
                <div className="w-20 h-20 bg-purple-900 rounded-full mx-auto my-2 flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-purple-300 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">✿</span>
                  </div>
                </div>
                <p className="text-xs text-center mt-2 font-medium">Let the Community In on Your Business & Events!</p>
                <Button className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white">Promote</Button>
              </div>
            </div>
          </div>

          {/* Sidebar Overlay */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 -z-10"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        </div>
      </div>
    )
  }

  // Desktop layout (original code)
  return (
    <div className="flex justify-center w-full bg-pink-50">
      {/* Main container with max-width for large screens */}
      <div className="grid grid-cols-12 w-full max-w-[1600px] bg-white">
        {/* Left Sidebar - 20% width (spans 2.4/12 columns) */}
        <aside
          className="col-span-3 lg:col-span-2 xl:col-span-2 border-r border-gray-200 bg-white"
          style={{ height: viewportHeight, position: "sticky", top: 0, overflowY: "auto" }}
        >
          <div className="flex flex-col h-full">
            {/* Location Header */}
            <div className="p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-xl">✿</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Los Angeles</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    Cesar Chavez Avenue <ChevronDown className="h-3 w-3 ml-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 py-4">
              <div className="space-y-1 px-3">
                <a href="#" className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100">
                  <Home className="h-5 w-5 text-gray-500" />
                  <span>Home</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100">
                  <Search className="h-5 w-5 text-gray-500" />
                  <span>Discover</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100">
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                  <span>Scoops</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span>Classifieds</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100">
                  <User className="h-5 w-5 text-gray-500" />
                  <span>Profile</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-sm py-2 px-3 rounded-md hover:bg-gray-100">
                  <MoreHorizontal className="h-5 w-5 text-gray-500" />
                  <span>More</span>
                </a>
              </div>
            </nav>

            {/* Promotion Section */}
            <div className="p-4 border-t mt-auto">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-xs">✿</span>
                  </div>
                  <span className="text-sm text-purple-600 font-medium">Ping Desi</span>
                </div>
                <div className="w-20 h-20 bg-purple-900 rounded-full mx-auto my-2 flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-purple-300 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">✿</span>
                  </div>
                </div>
                <p className="text-xs text-center mt-2 font-medium">Let the Community In on Your Business & Events!</p>
                <Button className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white">Promote</Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Middle Content Area - 50% width (spans 6/12 columns) */}
        <main className="col-span-9 lg:col-span-7 xl:col-span-7 overflow-y-auto border-r border-gray-200">
          <div className="p-4 lg:p-6 max-w-5xl mx-auto">
            {/* First Card - Initially visible with close button */}
            {isFirstCardVisible && (
              <div className="border rounded-lg p-4 shadow-sm bg-[#F2F5EB] relative">
                <button
                  onClick={handleCloseClick}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
                <h3 className="font-medium mb-2">New Notification Card</h3>
                <p className="text-gray-600 text-sm">
                  This is a notification card that can be dismissed. Click the X button in the top right corner to see
                  the second card.
                </p>
              </div>
            )}

            {/* Second Card - Initially invisible, appears when first card is closed */}
            {isSecondCardVisible && (
              <div className="border rounded-lg p-4 shadow-sm bg-[#F2F5EB] h-[380px] flex flex-col justify-center items-center">
                <h3 className="font-medium mb-4 text-lg">Expanded Content Card</h3>
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-2xl">✿</span>
                </div>
                <p className="text-gray-600 text-center max-w-md">
                  This larger card appears after dismissing the notification. It provides more space for content and can
                  be used for featured information or promotions.
                </p>
              </div>
            )}
            <h1 className="text-xl lg:text-2xl font-bold mb-4 mt-3">Scoops Around You</h1>

            {/* Post Card - 730px total height */}
            <div className="border rounded-lg overflow-hidden mb-6 shadow-sm h-[675px] flex flex-col">
              {/* User Info Section - 36px height */}
              <div className="p-4 flex items-center h-[50px]">
                <img src="/placeholder.jpg" width={36} height={36} alt="Profile" className="rounded-full mr-3" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm">Aarav Patel</p>
                      <p className="text-gray-500 text-xs">@AaravAdventures · 9h ago</p>
                    </div>
                    <button className="text-gray-400">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Image Section - 380px height */}
              <div className="relative h-[380px] w-full p-4">
                <img
                  src="/placeholder.svg?height=380&width=600"
                  alt="Food at restaurant"
                  className="object-cover w-full h-full"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Content Section - 185px for classifieds to hashtags */}
              <div className="p-4 flex flex-col h-[185px]">
                <div className="text-sm text-gray-500 mb-2">Classifieds</div>

                <p className="mb-2 text-sm">
                  Just had an amazing dinner at The Spice Lounge with my family. If you're nearby, you have to check
                  this place out—it's a vibe. From the cozy ambiance to the chef's special Biryani, everything was
                  spot-on. Can't wait to go back!
                </p>

                <button className="text-blue-600 text-xs font-medium mb-3 self-start">Read more</button>

                <div className="flex flex-wrap gap-2 mt-auto mb-3">
                  <Badge
                    variant="outline"
                    className="rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200 text-xs px-3 py-0.5"
                  >
                    #InfoDrop
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200 text-xs px-3 py-0.5"
                  >
                    #Dine in
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200 text-xs px-3 py-0.5"
                  >
                    #Take out
                  </Badge>
                  <Badge
                    variant="outline"
                    className="rounded-full bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200 text-xs px-3 py-0.5"
                  >
                    #Review
                  </Badge>
                </div>
              </div>

              {/* Engagement Section - Remaining height */}
              <div className="border-t mt-auto p-4 flex items-center justify-between text-gray-500">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1">
                    <Heart className="h-5 w-5 text-gray-400 fill-red-400 stroke-red-400" />
                    <span className="text-sm">12</span>
                  </button>
                  <button>
                    <MessageCircle className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <ThumbsDown className="h-4 w-4 text-gray-400 mr-1" />
                  <span>Nahh! Pass</span>
                </div>
              </div>
            </div>

            {/* Additional content for scrolling demonstration */}
            <div className="space-y-4">
              {[1, 2].map((item) => (
                <div key={item} className="border rounded-lg p-4 shadow-sm">
                  <h3 className="font-medium mb-2">More community content</h3>
                  <p className="text-gray-600 text-sm">
                    This is additional content to demonstrate scrolling in the middle section while the sidebars remain
                    fixed.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar - 30% width (spans 3.6/12 columns) */}
        <aside className="col-span-0 lg:col-span-3 xl:col-span-3 hidden lg:block border border-gray-100 overflow-y-auto">
          <div className="p-4 flex flex-col">
            {/* Header section */}
            <div className="mb-2">
              <div className="text-gray-500 text-sm mb-1">Thursday, 30 Jan</div>
              <h2 className="text-xl font-bold">
                <span>Today's </span>
                <span className="text-gray-300">Forecast</span>
              </h2>
            </div>

            {/* Cards container with flex layout and fixed gap */}
            <div className="flex flex-col gap-[10px] mt-2">
              {/* Weather Card - 210px height, 90% width, centered */}
              <div className="w-[99%] h-[200px] mx-auto bg-white rounded-xl border border-[#EAE8EC] p-1 shadow-sm overflow-hidden">
                {/* Top Section with Icons and Dividers */}
                <div className="bg-gray-100 rounded-lg p-3 mb-3 h-[94px]">
                  <div className="flex items-center h-full">
                    {/* Day Icon */}
                    <div className="flex-1 text-center">
                      <div className="flex justify-center">
                        <div className="w-10 h-10 bg-yellow-300 rounded-full flex items-center justify-center">
                          <span className="text-yellow-600">☀️</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm">At Day</div>
                        <div>
                          <span className="text-xl font-bold">24°</span>
                          <span className="text-xs text-gray-500">highest</span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-16 w-px bg-gray-300 mx-2"></div>

                    {/* Night Icon */}
                    <div className="flex-1 text-center">
                      <div className="flex justify-center">
                        <div className="w-10 h-10 bg-indigo-900 rounded-full flex items-center justify-center">
                          <span className="text-white">🌙</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm">At Night</div>
                        <div>
                          <span className="text-xl font-bold">11°</span>
                          <span className="text-xs text-gray-500">Lowest</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section with Title & Description */}
                <div className="h-[60px]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-blue-500">☂️</span>
                    <span className="font-medium">Grab your chai & maybe an umbrella!</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    There's a teeny tiny chance the skies might cry a little today. Keep one eye on the clouds... just
                    in case!
                  </p>
                </div>
              </div>

              {/* Allergy Card - 210px height, 90% width, centered */}
              <div className="w-[99%] h-[190px] mx-auto bg-white rounded-xl border border-[#EAE8EC] p-1 shadow-sm overflow-hidden">
                {/* Top Section with Icons and Dividers */}
                <div className="flex items-center justify-between mb-3 h-[84px]">
                  {/* Tree Icon */}
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white border border-green-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-green-500 text-xs">🌳</span>
                    </div>
                    <div className="mt-1 text-xs">
                      <div>Tree</div>
                      <div className="text-green-500">Low</div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-16 w-px bg-gray-200"></div>

                  {/* Ragweed Icon */}
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white border border-yellow-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-yellow-500 text-xs">🌾</span>
                    </div>
                    <div className="mt-1 text-xs">
                      <div>Ragweed</div>
                      <div className="text-yellow-500">Medium</div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-16 w-px bg-gray-200"></div>

                  {/* Mold Icon */}
                  <div className="text-center">
                    <div className="w-8 h-8 bg-white border border-red-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-red-500 text-xs">M</span>
                    </div>
                    <div className="mt-1 text-xs">
                      <div>Mold</div>
                      <div className="text-red-500">High</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Section with Title & Description */}
                <div className="h-[60px]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-pink-500">🌸</span>
                    <span className="font-medium">Allergy Alert: High Pollen Count</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    High pollen levels expected this afternoon. If you're allergy-prone, consider limiting outdoor time
                    and taking antihistamines
                  </p>
                </div>
              </div>

              {/* Horoscope Card - 210px height, 90% width, centered */}
              <div className="w-[99%] h-[190px] mx-auto bg-white rounded-xl border border-[#EAE8EC] p-1 shadow-sm overflow-hidden">
                {/* Top Section with Icons and Dividers */}
                <div className="flex items-center justify-between mb-1 h-[84px]">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-xs">♐</span>
                      </div>
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center -ml-1">
                        <span className="text-xs">♑</span>
                      </div>
                    </div>
                    <span className="font-medium">Sagittarius</span>
                  </div>
                  <div className="text-purple-600 text-sm">
                    <span>✨ Change</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-2">& Capricorn</div>

                {/* Bottom Section with Title & Description */}
                <div className="h-[130px]">
                  <div className="font-medium mb-1">Today's Vibe: Embrace the Unexpected</div>
                  <p className="text-sm text-gray-600 line-clamp-5">
                    A spontaneous twist may bring excitement and new connections today. Stay open-minded and adaptable
                    to make the most of opportunities that arise.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gray-200 my-4"></div>
              <div className="mb-2">
                   
                <h2 className="text-xl font-bold">
                  <span>Local </span>
                  <span className="text-gray-300">Buzz</span>
                </h2>
              </div>
              {/* Top Local Buzz Section */}
              <div className="w-[99%] mx-auto bg-white  p-4  overflow-hidden">
                

                <div className="space-y-5">
                  {/* The Verge News */}
                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-purple-600 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-xs">V</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">The Verge</div>
                      <h4 className="font-medium">Local Farmers' Market Extends Weekly Hours</h4>
                    </div>
                  </div>

                  {/* The New York Times News */}
                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-black rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-xs">T</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">The New York Times</div>
                      <h4 className="font-medium">Road Closures Announced for Upcoming Festival</h4>
                    </div>
                  </div>

                  {/* The Guardian News */}
                  <div className="flex items-start">
                    <div className="h-8 w-8 bg-blue-800 rounded flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-xs">G</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">The Guardian</div>
                      <h4 className="font-medium">City Council Approves Affordable Housing Project</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

