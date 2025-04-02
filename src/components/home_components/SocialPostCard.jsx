"use client";
import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Heart, MessageCircle, ThumbsDown } from "lucide-react";
import { handlePostRequest } from "../../hooks/api";
import { toast } from "react-toastify";

const SocialPostCard = ({
  post,
  isMobile = false,
  images = [],
  onLike,
  onComment,
  className = "",
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [scoopData, setScoopData] = useState(null);
  const [allScoops, setAllScoops] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const likeButtonRef = useRef(null);
  const reactionsRef = useRef(null);

  // Fetch all scoops data on component mount
  useEffect(() => {
    const fetchScoops = async () => {
      try {
        const scoopResponse = await handlePostRequest(
          "/scoop/getAllScoops",
          { scoopname: post.scoopname },
          {},
          false
        );
        console.log(scoopResponse, "respsones");
        setAllScoops(scoopResponse);

        // Find the scoop data that matches the post's scoopname
        if (post.scoopname) {
          const matchingScoop = scoopResponse.find(
            (scoop) => scoop.scoopname === post.scoopname
          );
          if (matchingScoop) {
            setScoopData(matchingScoop);
          }
        }
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

    if (post.scoopname) {
      fetchScoops();
    }
  }, [post.scoopname]);

  // Close reactions panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        reactionsRef.current &&
        !reactionsRef.current.contains(event.target) &&
        likeButtonRef.current &&
        !likeButtonRef.current.contains(event.target)
      ) {
        setShowReactions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev < images.length - 1 ? prev + 1 : prev
    );
  };

  const handleLikeHover = () => {
    setShowReactions(true);
  };

  const handleLikeLeave = () => {
    // Don't hide immediately to allow clicking on reactions
    setTimeout(() => {
      if (!reactionsRef.current?.matches(":hover")) {
        setShowReactions(false);
      }
    }, 300);
  };

  const handleReactionSelect = (reaction) => {
    setSelectedReaction(reaction);
    setIsLiked(true);
    setShowReactions(false);

    // Call the onLike callback with the selected reaction
    if (onLike) {
      onLike(reaction);
    }

    // Here you would make a POST request to your API with the reaction data
    // Example:
    // fetch('your-api-endpoint', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ postId: post.id, reaction: reaction })
    // });
  };

  const handleLikeClick = () => {
    if (selectedReaction) {
      // If already has a reaction, remove it
      setSelectedReaction(null);
      setIsLiked(false);
    } else {
      // Default like
      setIsLiked((prev) => !prev);
      if (onLike) onLike();
    }
  };

  // Function to calculate time ago from post creation date
  const getTimeAgo = (createdDate) => {
    if (!createdDate) return "";

    const created = new Date(createdDate);
    const now = new Date();
    const diffInSeconds = Math.floor((now - created) / 1000);

    // Less than a minute
    if (diffInSeconds < 60) {
      return "Just now";
    }

    // Less than an hour
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }

    // Less than a day
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }

    // Less than a week
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) {
      return "1 day ago";
    }
    if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    }

    // Less than a month
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks === 1) {
      return "1 week ago";
    }
    if (diffInWeeks < 4) {
      return `${diffInWeeks} weeks ago`;
    }

    // Less than a year
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths === 1) {
      return "1 month ago";
    }
    if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
    }

    // More than a year
    const diffInYears = Math.floor(diffInDays / 365);
    if (diffInYears === 1) {
      return "1 year ago";
    }
    return `${diffInYears} years ago`;
  };

  const timeAgo = getTimeAgo(post.createdate);

  // PaginationDots component embedded in the same file
  const PaginationDots = ({
    totalDots = 3,
    activeDot = 0,
    onDotClick,
    className = "",
  }) => {
    return (
      <div
        className={`flex items-center justify-center space-x-2 ${className}font-afacad`}
      >
        {Array.from({ length: totalDots }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick(index)}
            className="focus:outline-none"
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === activeDot ? "true" : "false"}
          >
            <div
              className={`
              ${
                index === activeDot
                  ? "w-4 h-4 bg-white"
                  : "w-2 h-2 bg-[#B6B3BB]"
              } 
              rounded-full transition-all duration-300
            `}
            />
          </button>
        ))}
      </div>
    );
  };

  // Reactions panel component
  const ReactionsPanel = ({ scoopData }) => {
    if (!scoopData || !scoopData.emojis) return null;

    return (
      <div
        ref={reactionsRef}
        className="absolute bottom-full left-0 mb-2 bg-white rounded-full shadow-lg px-2 py-1 flex items-center transition-all duration-300 z-20"
        onMouseEnter={() => setShowReactions(true)}
        onMouseLeave={() => setShowReactions(false)}
      >
        {scoopData.emojis.map((reaction) => (
          <button
            key={reaction.emojiid}
            className="hover:scale-125 transition-transform duration-200 px-2 py-1 relative group"
            onClick={() => handleReactionSelect(reaction)}
            aria-label={reaction.title}
          >
            <span className="text-xl">{reaction.emoji}</span>
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
              {reaction.title}
            </span>
          </button>
        ))}
      </div>
    );
  };

  if (isMobile) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full flex-shrink-0">
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gray-200 rounded-full mr-3 overflow-hidden">
                <img
                  src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                  alt={post.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{post.username}</div>
                <div className="text-xs text-gray-500">
                  {post.username} · {timeAgo}
                </div>
              </div>
            </div>
            <button className="text-gray-400">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>

          {/* Category */}
          {post.scoopname && (
            <div className="mb-2">
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                {post.scoopname}
              </span>
            </div>
          )}

          {/* Content */}
          <div className="mb-3">
            <p className="text-sm text-gray-800 h-[60px] overflow-clip">
              {post.contentinfo}
            </p>
            <button className="text-sm text-purple-600 font-medium mt-1">
              Read more
            </button>
          </div>

          {/* Hashtags */}
          {post.hoops && post.hoops.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.hoops.map((tag, index) => (
                <span
                  key={index}
                  className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full"
                >
                  {tag.hooptag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  ref={likeButtonRef}
                  className="flex items-center text-gray-500"
                  onMouseEnter={handleLikeHover}
                  onMouseLeave={handleLikeLeave}
                  onClick={handleLikeClick}
                >
                  {selectedReaction ? (
                    <span className="text-xl mr-1">
                      {selectedReaction.emoji}
                    </span>
                  ) : (
                    <Heart
                      className={`h-5 w-5 ${
                        isLiked ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  )}
                  <span className="ml-1 text-sm">{post.totalLikes}</span>
                </button>

                {showReactions && scoopData && (
                  <ReactionsPanel scoopData={scoopData} />
                )}
              </div>
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
      </div>
    );
  }

  return (
    <div
      className={`bg-white border rounded-xl shadow-sm overflow-hidden h-full mb-6 flex flex-col ${className}`}
    >
      {/* Header */}
      <div className="flex items-center p-4">
        <div className="h-10 w-10 rounded-full overflow-hidden relative">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%281%29-VNHYdwoXdSCUtVSUkbo0TIIpdt9Mzf.png"
            alt={post.username}
            className="w-full h-full object-cover"
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center">
            <span className="font-semibold text-sm">{post.username}</span>
          </div>
          <div className="text-gray-500 text-xs flex items-center">
            <span>@{post.username}</span>
            <span className="mx-1">•</span>
            <span>{timeAgo}</span>
          </div>
        </div>
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Menu"
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame-rFDa78aaT1Ml5vtnRtezN8VGFBedhm.svg"
            alt="Menu"
            width="20"
            height="20"
          />
        </button>
      </div>

      {/* Image Carousel */}

      {images && images.length > 0 && (
        <div className="relative flex-grow">
          <div className="w-full h-full relative rounded-lg pr-4 pl-4 bg-white overflow-hidden">
            <div className="w-full h-full rounded-lg overflow-hidden ">
              <img
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt="Post image"
                className="w-full h-[388px] object-cover"
                style={{}}
              />
            </div>
          </div>
          {images.length > 1 && (
            <>
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <button
                  onClick={handlePrevImage}
                  disabled={currentImageIndex === 0}
                  className="disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
                  aria-label="Previous image"
                >
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201171279062-vnAwUYEvftwRA2jmHffSdx5SwWvC3I.svg"
                    alt="Previous"
                    width="24"
                    height="24"
                  />
                </button>
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
                <button
                  onClick={handleNextImage}
                  disabled={currentImageIndex === images.length - 1}
                  className="disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
                  aria-label="Next image"
                >
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201171279061-n6vOnZLf3AKojY7n8t2UlShZOLgyyP.svg"
                    alt="Next"
                    width="24"
                    height="24"
                  />
                </button>
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                <PaginationDots
                  totalDots={images.length}
                  activeDot={currentImageIndex}
                  onDotClick={setCurrentImageIndex}
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* Category */}
      {post.scoopname && (
        <div className="px-4 pt-3">
          <button className="bg-gray-100 text-gray-800 font-medium text-sm rounded-full border border-gray-200 px-4 py-1.5">
            {post.scoopname}
          </button>
        </div>
      )}

      {/* Content */}
      <div className="p-4 pt-2">
        <p className="text-sm text-gray-800 mb-2">{post.contentinfo}</p>
        <button className="text-sm text-gray-800 font-medium italic border-b border-gray-800 pb-0.5 inline-block">
          Read more
        </button>
      </div>

      {/* Hashtags */}
      {post.hoops && post.hoops.length > 0 && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {post.hoops.map((tag, index) => (
            <span
              key={index}
              className="bg-purple-50 text-purple-800 text-xs px-3 py-1 rounded-full"
            >
              {tag.hooptag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="border-t border-gray-100 px-4 py-3 flex items-center mt-auto">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              ref={likeButtonRef}
              onClick={handleLikeClick}
              onMouseEnter={handleLikeHover}
              onMouseLeave={handleLikeLeave}
              className="flex items-center"
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              {selectedReaction ? (
                <span className="text-xl mr-1">{selectedReaction.emoji}</span>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
                    fill={isLiked ? "#FF0000" : "none"}
                    stroke={isLiked ? "#FF0000" : "#000000"}
                    strokeWidth="1.5"
                  />
                </svg>
              )}
            </button>

            {showReactions && scoopData && (
              <ReactionsPanel scoopData={scoopData} />
            )}
          </div>

          <div className="flex items-center">
            <span className="text-sm font-medium mr-1">{post.totalLikes}</span>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%201000014772-A60n4ByPCLjN4CrTB0VOCyvtZbXDvp.png"
              alt="Like"
              width="24"
              height="16"
              className="object-contain"
            />
          </div>
          <button
            onClick={onComment}
            className="flex items-center"
            aria-label="Comment"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                stroke="#928E99"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="ml-auto flex items-center text-sm text-gray-500">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%20%281%29-cLTeEyEEEt8C4SNUH7HjLQPS4H0rAo.svg"
            alt="Pass"
            width="24"
            height="24"
            className="mr-1"
          />
          <span>Nahh! Pass</span>
        </div>
      </div>
    </div>
  );
};

export default SocialPostCard;
