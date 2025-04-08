"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Camera,
  Image,
  MapPin,
  Link2,
  ChevronDown,
  Hash,
  Check,
  X,
  Loader2,
} from "lucide-react";
import Button from "./Button";
import { getPostings } from "../../services/scoops";
import Popover from "./Popover";
import { classNames } from "../../utils/classNames";
import ImagePickerModal from "./ImagePickerModal";
import { toast } from "react-toastify";
import SocialPostCard from "../home_components/SocialPostCard";
import { postScoops, getScoops, getHoops } from "../../services/scoops";

function Hashtag({ tag, onClick, selected }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "px-3 py-1 rounded-full text-sm font-medium",
        selected
          ? "bg-primary text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      )}
    >
      {tag}
    </button>
  );
}

function CreateScoopForm() {
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [images, setImages] = useState([]); // Store multiple image files
  const [imagePickerMode, setImagePickerMode] = useState("upload");
  const [isHashtagPopoverOpen, setIsHashtagPopoverOpen] = useState(false);
  const [isCategoryPopoverOpen, setIsCategoryPopoverOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [geohash, setGeohash] = useState("zsjs"); // Default geohash

  // State for API data
  const [scoops, setScoops] = useState([]);
  const [hoops, setHoops] = useState([]);
  const [availableHoops, setAvailableHoops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /***********************social media*****************/
  const [postings, setPostings] = useState([]);
  const [feedLoading, setFeedLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true); // For initial load
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const POSTS_PER_PAGE = 10;

  // Last element ref callback for intersection observer
  const lastPostElementRef = useCallback(
    (node) => {
      if (feedLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            fetchMorePosts();
          }
        },
        {
          rootMargin: "100px",
        }
      );

      if (node) observer.current.observe(node);
    },
    [feedLoading, hasMore]
  );

  // Function to fetch initial posts
  const fetchInitialPosts = async () => {
    setInitialLoading(true);
    setFeedLoading(true);
    setError(null);

    const geohash = localStorage.getItem("geohash") || "9v6m";
    const requestBody = { geohash, offset: 0 };

    try {
      const response = await getPostings(requestBody);
      setPostings(response.posts || []);
      setOffset(POSTS_PER_PAGE);
      setHasMore((response.posts || []).length >= POSTS_PER_PAGE);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ??
        error.data?.message ??
        error.message ??
        error;
      setError(errorMessage);

      toast.error("" + errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setHasMore(false);
    } finally {
      setFeedLoading(false);
      setInitialLoading(false);
    }
  };

  // Function to fetch more posts
  const fetchMorePosts = async () => {
    if (!hasMore || feedLoading) return;

    setFeedLoading(true);
    const geohash = localStorage.getItem("geohash") || "9v6m";
    const requestBody = { geohash, offset };

    try {
      const response = await getPostings(requestBody);
      const newPosts = response.posts || [];
      if (newPosts.length > 0) {
        setPostings((prevPosts) => [...prevPosts, ...newPosts]);
        setOffset((prevOffset) => prevOffset + POSTS_PER_PAGE);
        setHasMore(newPosts.length >= POSTS_PER_PAGE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ?? error.data?.message ?? error;
      setError(errorMessage);
      toast.error("" + errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      setHasMore(false);
    } finally {
      setFeedLoading(false);
    }
  };

  // Refresh feed after posting
  const refreshFeed = () => {
    setOffset(0);
    setHasMore(true);
    fetchInitialPosts();
  };

  useEffect(() => {
    fetchInitialPosts();
  }, []);

  /***********************social media end*****************/

  // Fetch scoops and hoops when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch scoops and hoops in parallel
        const [scoopsData, hoopsData] = await Promise.all([
          getScoops(),
          getHoops(),
        ]);

        setScoops(scoopsData);
        setHoops(hoopsData);

        // Group hoops for display
        const groupedHoops = groupHoopsByCategory(hoopsData);
        setAvailableHoops(groupedHoops);
      } catch (error) {
        toast.error(
          "Failed to load categories and hashtags: " + error.message,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
          }
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Group hoops into arrays for display
  const groupHoopsByCategory = (hoopsData) => {
    // Create groups of 6 hoops each
    const groups = [];
    for (let i = 0; i < hoopsData.length; i += 6) {
      groups.push(hoopsData.slice(i, i + 6));
    }
    return groups;
  };

  // Get geolocation when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would convert lat/long to geohash
          // For now, we'll use a default value
          setGeohash("9v6m");
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  }, []);

  // Update available hoops when selected category changes
  useEffect(() => {
    if (selectedCategory && scoops.length > 0) {
      // Find the selected scoop
      const scoop = scoops.find(
        (s) => s.scoopid.toString() === selectedCategory.id
      );

      if (scoop && scoop.hoops) {
        // Group the hoops for this scoop
        const scoopHoops = scoop.hoops.map((h) => h.hoopid);

        // Filter all hoops to only include those for this scoop
        const filteredHoops = hoops.filter((h) =>
          scoopHoops.includes(h.hoopid)
        );

        // Group the filtered hoops
        const groupedHoops = groupHoopsByCategory(filteredHoops);
        setAvailableHoops(groupedHoops);

        // Clear selected hashtags when category changes
        setSelectedHashtags([]);
      }
    }
  }, [selectedCategory, scoops, hoops]);

  const toggleHashtag = (hoop) => {
    if (selectedHashtags.some((h) => h.hoopid === hoop.hoopid)) {
      setSelectedHashtags(
        selectedHashtags.filter((h) => h.hoopid !== hoop.hoopid)
      );
    } else {
      setSelectedHashtags([...selectedHashtags, hoop]);
    }
  };

  const openImagePicker = (mode) => {
    setImagePickerMode(mode);
    setIsImagePickerOpen(true);
  };

  // Handle multiple image selection
  const handleImageSelected = (imageData) => {
    if (Array.isArray(imageData)) {
      // If we receive an array of images, limit to max 2 images total
      const newImages = [...images];
      for (const img of imageData) {
        if (newImages.length < 2) {
          newImages.push(img);
        } else {
          toast.warning("Maximum 2 images allowed", {
            position: "top-right",
            autoClose: 3000,
          });
          break;
        }
      }
      setImages(newImages);
    } else if (imageData) {
      // If we receive a single image
      if (images.length < 2) {
        setImages([...images, imageData]);
      } else {
        toast.warning("Maximum 2 images allowed", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  // Remove a specific image
  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handlePost = async () => {
    try {
      setIsProcessing(true);

      if (!content.trim() && images.length === 0) {
        toast.error("Please enter some content or add an image", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        return;
      }

      if (!selectedCategory) {
        toast.error("Please select a category", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        });
        return;
      }

      // Create FormData to send files
      const formData = new FormData();

      // Add text data
      formData.append("contentinfo", content);
      formData.append("scoopid", selectedCategory.id);
      formData.append("geohash", geohash);

      // Add hoopids as JSON string
      formData.append(
        "hoopids",
        JSON.stringify(selectedHashtags.map((h) => h.hoopid))
      );

      // Add image files directly - maximum 2 files
      images.forEach((imageFile, index) => {
        if (index < 2) {
          formData.append("photopath", imageFile);
        }
      });

      for (const [key, value] of formData.entries()) {
        console.log(
          key + ":",
          value instanceof File
            ? `File: ${value.name}, type: ${value.type}, size: ${value.size} bytes`
            : value
        );
      }

      // Send data using your postScoops service, modified to handle FormData
      const response = await postScoops(formData);

      // Show success message
      toast.success("Scoop has been posted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });

      // Reset form
      setContent("");
      setSelectedCategory(null);
      setSelectedHashtags([]);
      setImages([]);

      // Refresh the feed to show the new post
      refreshFeed();
    } catch (error) {
      toast.error(
        "" + (error.response?.data?.message ?? error.data?.message ?? error),
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
        }
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDoneHashtags = () => {
    setIsHashtagPopoverOpen(false);
  };

  // Add location handler
  const handleAddLocation = () => {
    // In a real app, you would open a location picker
    // For now, we'll just set the geohash
    setGeohash("9v6m");
    toast.info("Location added", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Convert API data to category items for display
  const getCategoryItems = () => {
    if (!scoops || scoops.length === 0) {
      return [];
    }

    return scoops.map((scoop) => ({
      id: scoop.scoopid.toString(),
      name: scoop.scoopname,
      icon: <span style={{ fontSize: "1.5rem" }}>{scoop.emoji}</span>,
      description: `${scoop.scoopname} scoop`,
    }));
  };

  const CategoryItem = ({ category, onClick }) => (
    <div
      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200"
      onClick={onClick}
    >
      <div className="w-10 h-10 flex items-center justify-center">
        {category.icon}
      </div>
      <div>
        <div className="font-medium">{category.name}</div>
        <div className="text-sm text-gray-500">{category.description}</div>
      </div>
    </div>
  );

  const categoryPopoverContent = (
    <div className="flex flex-col max-h-[400px] overflow-y-auto">
      {isLoading ? (
        <div className="p-4 text-center">Loading categories...</div>
      ) : (
        getCategoryItems().map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            onClick={() => {
              setSelectedCategory(category);
              setIsCategoryPopoverOpen(false);
            }}
          />
        ))
      )}
    </div>
  );

  const hashtagPopoverContent = (
    <div className="p-4 flex flex-col gap-4 max-h-[400px] overflow-y-auto">
      {isLoading ? (
        <div className="text-center">Loading hashtags...</div>
      ) : availableHoops.length === 0 ? (
        <div className="text-center">Please select a category first</div>
      ) : (
        <>
          {availableHoops.map((group, index) => (
            <div key={index} className="flex flex-wrap gap-2">
              {group.map((hoop) => (
                <Hashtag
                  key={hoop.hoopid}
                  tag={hoop.hooptag}
                  selected={selectedHashtags.some(
                    (h) => h.hoopid === hoop.hoopid
                  )}
                  onClick={() => toggleHashtag(hoop)}
                />
              ))}
            </div>
          ))}
          <Button
            variant="ghost"
            className="ml-auto flex items-center gap-1 text-primary text-sm"
            onClick={handleDoneHashtags}
          >
            <Check size={16} />
            <span>Done</span>
          </Button>
        </>
      )}
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-lg border p-4 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Popover
            content={categoryPopoverContent}
            align="start"
            open={isCategoryPopoverOpen}
            onOpenChange={setIsCategoryPopoverOpen}
          >
            <Button
              variant="outline"
              className="rounded-full flex items-center gap-2 bg-gray-100 text-gray-700"
            >
              <div className="w-6 h-6 rounded-full bg-gray-700 text-white flex items-center justify-center">
                <Hash size={14} />
              </div>
              <span>
                {selectedCategory ? selectedCategory.name : "Select a scoop"}
              </span>
              <ChevronDown size={16} />
            </Button>
          </Popover>
          <Popover
            content={hashtagPopoverContent}
            align="start"
            open={isHashtagPopoverOpen}
            onOpenChange={(open) => {
              // Only allow opening if a category is selected
              if (open && !selectedCategory) {
                return;
              }
              setIsHashtagPopoverOpen(open);
            }}
          >
            <Button
              variant="outline"
              className="rounded-full flex items-center gap-2 bg-gray-100 text-gray-700"
              disabled={!selectedCategory}
            >
              <div className="w-6 h-6 rounded-full bg-gray-700 text-white flex items-center justify-center">
                <Hash size={14} />
              </div>
              <span>Add Hoop</span>
              <ChevronDown size={16} />
            </Button>
          </Popover>
        </div>

        <div className="mb-4">
          <textarea
            className="w-full p-2 min-h-[100px] border-none outline-none resize-none"
            placeholder="What's in your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* Display multiple images */}
        {images.length > 0 && (
          <div className="mb-4 grid grid-cols-2 gap-2">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={img instanceof File ? URL.createObjectURL(img) : img}
                  alt={`Uploaded content ${index + 1}`}
                  className="w-full h-auto rounded-md object-cover aspect-square"
                />
                <button
                  className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-white"
                  onClick={() => removeImage(index)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedHashtags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedHashtags.map((hoop) => (
              <Hashtag
                key={hoop.hoopid}
                tag={hoop.hooptag}
                selected
                onClick={() => toggleHashtag(hoop)}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => openImagePicker("camera")}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <Camera size={20} />
            </button>
            <button
              onClick={() => openImagePicker("upload")}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <Image size={20} />
            </button>
            <button
              onClick={handleAddLocation}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <MapPin size={20} />
            </button>
            <button className="text-gray-500 hover:text-gray-800 transition-colors">
              <Link2 size={20} />
            </button>
          </div>

          {(content || images.length > 0 || selectedHashtags.length > 0) && (
            <Button
              variant="primary"
              className="rounded-full px-6 bg-black text-white"
              onClick={handlePost}
              disabled={isProcessing}
            >
              {isProcessing ? "Posting..." : "Post"}
            </Button>
          )}
        </div>

        <ImagePickerModal
          isOpen={isImagePickerOpen}
          onClose={() => setIsImagePickerOpen(false)}
          onImageSelected={handleImageSelected}
          mode={imagePickerMode}
          allowMultiple={true}
        />
      </div>

      {/* Social Feed Section */}
      <div className="social-feed">
        <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>

        {/* Initial loading state */}
        {initialLoading && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Loading posts...</span>
          </div>
        )}

        {/* Error state */}
        {error && !initialLoading && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
            <p>Failed to load posts: {error}</p>
            <button
              className="mt-2 text-sm font-medium underline"
              onClick={fetchInitialPosts}
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!initialLoading && !error && postings.length === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-8 text-center">
            <p className="text-gray-500 mb-2">No posts found</p>
            <p className="text-sm text-gray-400">
              Be the first to create a post!
            </p>
          </div>
        )}

        {/* Posts list */}
        {!initialLoading && postings.length > 0 && (
          <div className="space-y-4">
            {postings.map((post, index) => (
              <div
                key={post.id || post._id || index}
                ref={index === postings.length - 1 ? lastPostElementRef : null}
                className="transition-all duration-300 ease-in-out"
              >
                <SocialPostCard
                  post={post}
                  username={post.username}
                  images={post.photopath ? post.photopath.split(",") : []}
                />
              </div>
            ))}

            {/* Loading more indicator */}
            {feedLoading && !initialLoading && (
              <div className="flex justify-center items-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                <span className="ml-2 text-sm text-gray-500">
                  Loading more...
                </span>
              </div>
            )}

            {/* End of feed indicator */}
            {!hasMore && !feedLoading && postings.length > 0 && (
              <div className="text-center py-6 text-gray-500 text-sm border-t border-gray-100">
                You've reached the end of the feed
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default CreateScoopForm;
