"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, MessageCircle, ThumbsDown } from "lucide-react";
import { toast } from "react-toastify";
import { addLike, getScoops, removeLike } from "../../services/scoops.js";
import CommentSection from "./CommentSection.jsx";

const SocialPostCard = ({
  post,
  isMobile = false,
  images = [],
  onComment,
  className = "",
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(
    (post.userLikes && post.userLikes[0]) || null
  );
  const [scoopData, setScoopData] = useState(null);
  const [allScoops, setAllScoops] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalLikes, setTotalLikes] = useState(post.totalLikes);
  const likeButtonRef = useRef(null);
  const reactionsRef = useRef(null);
  const [reactionGroups, setReactionGroups] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const hiddenCommentSectionRef = useRef(null);

  // Function to be passed to CommentSection to update comment count
  const updateCommentCount = (count) => {
    setCommentCount(count);
    setCommentsLoaded(true);
  };

  // Fetch all scoops data on component mount
  useEffect(() => {
    const fetchScoops = async () => {
      try {
        const scoopResponse = await getScoops();
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

        // Process reactions if post has likes
        if (post.likes && Array.isArray(post.likes)) {
          setReactionGroups(processReactions(post.likes));
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
  }, [post.scoopname, post.likes]);

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

  const onLike = async (postid, emoji) => {
    const payload = { postid: postid, emojiid: emoji.emojiid };
    try {
      await addLike(payload);
      setSelectedReaction(emoji);

      if (!isLiked) {
        setTotalLikes((prev) => prev + 1);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ??
        error.data?.message ??
        error.message ??
        error;

      if (!localStorage.getItem("token")) {
        window.location.href = "/signin";
      }
      toast.error("Error While Adding Like");
    }
  };
  const onRemoveLike = async (postid) => {
    const payload = { postid: postid };
    try {
      await removeLike(payload);
      setTotalLikes((prev) => {
        if (prev > 1) {
          return prev - 1;
        }
        return 0;
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ??
        error.data?.message ??
        error.message ??
        error;

      toast.error("Error While Removing Like");
    }
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

  const handleReactionSelect = async (reaction) => {
    // Store the previous reaction for potential removal
    const previousReaction = selectedReaction;

    // Check if clicking the same reaction (toggle off)
    if (
      isLiked &&
      selectedReaction &&
      selectedReaction.emojiid === reaction.emojiid
    ) {
      // Update UI immediately before API call
      setSelectedReaction(null);
      setIsLiked(false);

      // Remove this reaction from the groups if it was the user's only contribution
      setReactionGroups((prevGroups) => {
        const updatedGroups = { ...prevGroups };
        if (updatedGroups[reaction.emoji]) {
          // Decrease count
          updatedGroups[reaction.emoji].count -= 1;

          // Remove current user from users list
          const currentUsername = localStorage.getItem("username") || "You";
          updatedGroups[reaction.emoji].users = updatedGroups[
            reaction.emoji
          ].users.filter((username) => username !== currentUsername);

          // Remove the emoji group if count is zero
          if (updatedGroups[reaction.emoji].count <= 0) {
            delete updatedGroups[reaction.emoji];
          }
        }
        return updatedGroups;
      });

      // Call API to remove like
      await onRemoveLike(post.postingid);
      return;
    }

    // Set the new reaction immediately for responsive UI
    setSelectedReaction(reaction);
    setIsLiked(true);

    // Update the reaction groups immediately
    setReactionGroups((prevGroups) => {
      const updatedGroups = { ...prevGroups };
      const currentUsername = localStorage.getItem("username") || "You";

      // If user had a previous reaction, remove it from that group
      if (previousReaction && previousReaction.emoji) {
        if (updatedGroups[previousReaction.emoji]) {
          updatedGroups[previousReaction.emoji].count -= 1;
          updatedGroups[previousReaction.emoji].users = updatedGroups[
            previousReaction.emoji
          ].users.filter((username) => username !== currentUsername);

          // Remove the emoji group if count is zero
          if (updatedGroups[previousReaction.emoji].count <= 0) {
            delete updatedGroups[previousReaction.emoji];
          }
        }
      }

      // Add the new reaction to the groups
      if (!updatedGroups[reaction.emoji]) {
        updatedGroups[reaction.emoji] = {
          count: 1,
          users: [currentUsername],
        };
      } else {
        // Increment count if the emoji group already exists
        updatedGroups[reaction.emoji].count += 1;

        // Add user to the users list if not already there
        if (!updatedGroups[reaction.emoji].users.includes(currentUsername)) {
          updatedGroups[reaction.emoji].users.push(currentUsername);
        }
      }

      return updatedGroups;
    });

    // Hide reactions panel
    setShowReactions(false);

    // Call API to add like
    await onLike(post.postingid, reaction);
  };

  const handleLikeClick = async () => {
    if (selectedReaction) {
      // Update UI immediately
      const reactionToRemove = selectedReaction;
      setSelectedReaction(null);
      setIsLiked(false);

      // Update reaction groups
      setReactionGroups((prevGroups) => {
        const updatedGroups = { ...prevGroups };
        if (updatedGroups[reactionToRemove.emoji]) {
          // Decrease count
          updatedGroups[reactionToRemove.emoji].count -= 1;

          // Remove current user from users list
          const currentUsername = localStorage.getItem("username") || "You";
          updatedGroups[reactionToRemove.emoji].users = updatedGroups[
            reactionToRemove.emoji
          ].users.filter((username) => username !== currentUsername);

          // Remove the emoji group if count is zero
          if (updatedGroups[reactionToRemove.emoji].count <= 0) {
            delete updatedGroups[reactionToRemove.emoji];
          }
        }
        return updatedGroups;
      });

      // Call API
      await onRemoveLike(post.postingid);
    } else if (scoopData && scoopData.emojis && scoopData.emojis.length > 0) {
      // Default to first emoji when clicking like button directly
      const defaultReaction = scoopData.emojis[0];
      setSelectedReaction(defaultReaction);
      setIsLiked(true);

      // Update reaction groups
      setReactionGroups((prevGroups) => {
        const updatedGroups = { ...prevGroups };
        const currentUsername = localStorage.getItem("username") || "You";

        if (!updatedGroups[defaultReaction.emoji]) {
          updatedGroups[defaultReaction.emoji] = {
            count: 1,
            users: [currentUsername],
          };
        } else {
          // Increment count
          updatedGroups[defaultReaction.emoji].count += 1;

          // Add user to the users list if not already there
          if (
            !updatedGroups[defaultReaction.emoji].users.includes(
              currentUsername
            )
          ) {
            updatedGroups[defaultReaction.emoji].users.push(currentUsername);
          }
        }

        return updatedGroups;
      });

      // Call API
      await onLike(post.postingid, defaultReaction);
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

  // Function to process reactions and group them by emoji type
  const processReactions = (likes) => {
    if (!likes || !Array.isArray(likes)) return {};

    const groups = {};
    likes.forEach((like) => {
      if (like.emoji) {
        if (!groups[like.emoji]) {
          groups[like.emoji] = {
            count: 1,
            users: [like.username || "User"],
          };
        } else {
          groups[like.emoji].count += 1;
          if (like.username) {
            groups[like.emoji].users.push(like.username);
          }
        }
      }
    });

    return groups;
  };

  // Reaction bubbles component to show emoji reactions
  const ReactionBubbles = ({ reactionGroups }) => {
    if (!reactionGroups || Object.keys(reactionGroups).length === 0)
      return null;

    return (
      <div className="flex -space-x-1 overflow-hidden">
        {Object.entries(reactionGroups).map(([emoji, data], index) => (
          <div
            key={index}
            className="inline-block h-6 w-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-sm shadow-sm hover:scale-110 transition-transform"
            title={`${data.users.slice(0, 3).join(", ")}${
              data.users.length > 3
                ? ` and ${data.users.length - 3} others`
                : ""
            }`}
          >
            {emoji}
          </div>
        ))}
      </div>
    );
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  if (isMobile) {
    return (
      <div className="bg-white rounded-lg shadow-sm w-full flex-shrink-0">
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

          {/* Image Carousel */}
          {images && images.length > 0 && (
            <div className="relative flex-grow mb-4">
              <div className="w-full h-full relative rounded-lg bg-white overflow-hidden">
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <img
                    src={images[currentImageIndex] || "/placeholder.svg"}
                    alt="Post image"
                    className="w-full h-[160px] object-cover"
                  />
                </div>
              </div>
              {images.length > 1 && (
                <>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
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
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
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
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                        stroke={isLiked ? "#FF0000" : "#000000"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>

                {showReactions && scoopData && (
                  <ReactionsPanel scoopData={scoopData} />
                )}
              </div>
              <div className="flex items-center ml-1">
                <ReactionBubbles reactionGroups={reactionGroups} />
                <span className="ml-1 text-sm">{totalLikes}</span>
              </div>
              <button
                onClick={toggleComments}
                className="flex items-center text-gray-500"
              >
                <MessageCircle className="h-5 w-5 mr-1" />
                <span>
                  {commentCount} {commentCount === 1 ? "comment" : "comments"}
                </span>
              </button>
            </div>
            <button className="flex items-center text-gray-500 text-xs">
              <ThumbsDown className="h-4 w-4 mr-1" />
              Nahh! Pass
            </button>
          </div>

          {/* Hidden CommentSection to fetch count on load */}
          <div className={commentsLoaded ? "hidden" : "hidden"}>
            <CommentSection
              onCommentCountChange={updateCommentCount}
              postid={post.postingid}
              autoFetchCount={true}
              ref={hiddenCommentSectionRef}
            />
          </div>

          {/* Visible CommentSection when showComments is true */}
          {showComments && (
            <CommentSection
              onCommentCountChange={updateCommentCount}
              postid={post.postingid}
              autoFetchCount={!commentsLoaded}
            />
          )}
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
              />
            </div>
          </div>
          {images.length > 1 && (
            <>
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
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
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10">
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
      {scoopData && scoopData.hoops && scoopData.hoops.length > 0 && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {scoopData.hoops.map((tag, index) => (
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
                <span className="text-xl ">{selectedReaction.emoji}</span>
              ) : (
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                    stroke={"#000000"}
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            {showReactions && scoopData && (
              <ReactionsPanel scoopData={scoopData} />
            )}
          </div>

          <div className="flex items-center">
            <ReactionBubbles reactionGroups={reactionGroups} />
            <span className="text-sm font-medium ml-1">{totalLikes}</span>
          </div>
          <button
            onClick={toggleComments}
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
            <span className="ml-1">
              {commentCount} {commentCount === 1 ? "comment" : "comments"}
            </span>
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

      {/* Hidden CommentSection to fetch count on load */}
      <div className={commentsLoaded ? "hidden" : "hidden"}>
        <CommentSection
          onCommentCountChange={updateCommentCount}
          postid={post.postingid}
          autoFetchCount={true}
          ref={hiddenCommentSectionRef}
        />
      </div>

      {/* Visible CommentSection when showComments is true */}
      {showComments && (
        <CommentSection
          onCommentCountChange={updateCommentCount}
          postid={post.postingid}
          autoFetchCount={!commentsLoaded}
        />
      )}
    </div>
  );
};

export default SocialPostCard;
