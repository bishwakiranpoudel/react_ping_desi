
import { useState, useEffect, useRef, useCallback } from "react";
import CreateScoopForm from "../components/scoops_components/CreateScoopForm";
import MobileCreateScoop from "../components/scoops_components/MobileCreateScoop";
import { useIsMobile } from "../hooks/use-mobile";
import MainLayout from "../components/MainLayout";
import FloatingActionButton from "../components/scoops_components/FAB";
import HomeRightSidebar from "../components/home_components/HomeRightSidebar";
import { postScoops, getPostings } from "../services/scoops";
import { toast } from "react-toastify";
import SocialPostCard from "../components/home_components/SocialPostCard";

function ScoopsPage() {
  const isMobile = useIsMobile();
  const [showMobileCreate, setShowMobileCreate] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const geohash = localStorage.getItem("geohash") || "9v6m";

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
      // Refresh the feed after posting
      refreshFeed();
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
          <div style={{ padding: "1rem" }}>
            {!initialLoading && postings.length > 0 && (
              <div className="space-y-4">
                {postings.map((post, index) => (
                  <div
                    key={post.id || post._id || index}
                    ref={
                      index === postings.length - 1 ? lastPostElementRef : null
                    }
                    className="transition-all duration-300 ease-in-out"
                  >
                    <SocialPostCard
                      post={post}
                      username={post.username}
                      images={post.photopath ? post.photopath.split(",") : []}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
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
      <CreateScoopForm
        postings={postings}
        feedLoading={feedLoading}
        initialLoading={initialLoading}
        error={error}
        hasMore={hasMore}
        lastPostElementRef={lastPostElementRef}
        refreshFeed={refreshFeed}
      />
    </MainLayout>
  );
}

export default ScoopsPage;
