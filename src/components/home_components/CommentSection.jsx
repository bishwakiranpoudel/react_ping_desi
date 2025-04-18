"use client";

import { useState, useEffect } from "react";
import CommentInput from "./CommentInput";
import Comment from "./Comment";
import { postComments, getComments } from "../../services/addComment";
import { toast } from "react-toastify";

const CommentSection = ({ onCommentCountChange, postid }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch comments when component mounts or postid changes
  useEffect(
    () => {
      const fetchComments = async () => {
        if (!postid) return;

        setIsLoading(true);
        try {
          const response = await getComments(postid);
          if (response.status === "success" && response.data?.comments) {
            // Transform API comments to match our component structure
            const formattedComments = response.data.comments.map(comment => ({
              id: comment.id,
              author: {
                name: comment.username || "Unknown User",
                username: comment.username || "unknown",
                avatar: comment.avatar_url // Set default avatar if needed
              },
              content: comment.comment,
              timestamp: formatDate(comment.createddate),
              likes: 0,
              // Make sure replies have the same structure as main comments
              replies: Array.isArray(comment.replies)
                ? comment.replies.map(reply => ({
                    id: reply.id,
                    author: {
                      name: reply.username || "Unknown User",
                      username: reply.username || "unknown",
                      avatar: reply.avatar_url // Set default avatar if needed
                    },
                    content: reply.comment,
                    timestamp: formatDate(reply.createddate),
                    likes: 0
                  }))
                : []
            }));

            setComments(formattedComments);
          }
        } catch (error) {
          toast.error(
            "" +
              (error.response?.data?.message ??
                error.data?.message ??
                "Failed to load comments"),
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true
            }
          );
          console.error("Failed to fetch comments:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchComments();
    },
    [postid]
  );

  // Calculate total comments (including replies) and update parent component
  useEffect(
    () => {
      const calculateTotalComments = () => {
        let total = comments.length;
        comments.forEach(comment => {
          total += comment.replies ? comment.replies.length : 0;
        });
        return total;
      };

      const total = calculateTotalComments();
      onCommentCountChange(total);
    },
    [comments, onCommentCountChange]
  );

  // Helper function to format date
  const formatDate = dateString => {
    if (!dateString) return "Unknown date";

    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const addComment = async (text, image = null) => {
    if (!text.trim() && !image) return;

    const newComment = {
      id: Date.now(), // Temporary ID
      author: {
        name: "You", // This will be replaced when we refresh comments
        username: "user",
        avatar: null
      },
      content: text,
      image: image,
      timestamp: "Just now",
      likes: 0,
      replies: []
    };

    // Optimistically add comment to UI
    setComments([newComment, ...comments]);

    try {
      const response = await postComments({
        postid: postid,
        comment: text,
        image: image
      });

      toast.success("Comment added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true
      });

      // Refresh comments to get the updated list with server-generated IDs
      const updatedCommentsResponse = await getComments(postid);
      if (
        updatedCommentsResponse.status === "success" &&
        updatedCommentsResponse.data?.comments
      ) {
        const formattedComments = updatedCommentsResponse.data.comments.map(
          comment => ({
            id: comment.id,
            author: {
              name: comment.username || "Unknown User",
              username: comment.username || "unknown",
              avatar: comment.avatar_url
            },
            content: comment.comment,
            timestamp: formatDate(comment.createddate),
            likes: 0,
            // Make sure replies have the same structure as main comments
            replies: Array.isArray(comment.replies)
              ? comment.replies.map(reply => ({
                  id: reply.id,
                  author: {
                    name: reply.username || "Unknown User",
                    username: reply.username || "unknown",
                    avatar: reply.avatar_url
                  },
                  content: reply.comment,
                  timestamp: formatDate(reply.createddate),
                  likes: 0
                }))
              : []
          })
        );

        setComments(formattedComments);
      }
    } catch (error) {
      // Remove the optimistically added comment
      setComments(comments);
      console.error("error", error);

      toast.error(
        "" + (error.response?.data?.message ?? error.data?.message ?? error),
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true
        }
      );
    }
  };

  const addReply = async (commentId, text, image = null) => {
    if (!text.trim() && !image) return;

    // Create a temporary reply for optimistic UI update
    const reply = {
      id: Date.now(),
      author: {
        name: "You",
        username: "user",
        avatar: null // Make sure avatar is defined
      },
      content: text,
      image: image,
      timestamp: "Just now",
      likes: 0
    };

    // Optimistically update UI
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    });

    setComments(updatedComments);

    try {
      // Call the same postComments API but with parentid
      const response = await postComments({
        postid: postid,
        comment: text,
        image: image,
        parentid: commentId // Add the parent comment ID
      });

      toast.success("Reply added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true
      });

      // Refresh comments to get the updated list with server-generated IDs
      const updatedCommentsResponse = await getComments(postid);
      if (
        updatedCommentsResponse.status === "success" &&
        updatedCommentsResponse.data?.comments
      ) {
        const formattedComments = updatedCommentsResponse.data.comments.map(
          comment => ({
            id: comment.id,
            author: {
              name: comment.username || "Unknown User",
              username: comment.username || "unknown",
              avatar: comment.avatar_url
            },
            content: comment.comment,
            timestamp: formatDate(comment.createddate),
            likes: 0,
            // Make sure replies have the same structure as main comments
            replies: Array.isArray(comment.replies)
              ? comment.replies.map(reply => ({
                  id: reply.id,
                  author: {
                    name: reply.username || "Unknown User",
                    username: reply.username || "unknown",
                    avatar: reply.avatar_url
                  },
                  content: reply.comment,
                  timestamp: formatDate(reply.createddate),
                  likes: 0
                }))
              : []
          })
        );

        setComments(formattedComments);
      }
    } catch (error) {
      // Revert to previous state on error
      setComments(
        comments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replies: comment.replies.filter(r => r.id !== reply.id)
            };
          }
          return comment;
        })
      );

      toast.error(
        "" + (error.response?.data?.message ?? error.data?.message ?? error),
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true
        }
      );
      console.error("Failed to post reply:", error);
    }
  };

  const handleLike = commentId => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.likes + 1
        };
      }

      // Check if the comment is in replies
      const updatedReplies = comment.replies
        ? comment.replies.map(reply => {
            if (reply.id === commentId) {
              return {
                ...reply,
                likes: reply.likes + 1
              };
            }
            return reply;
          })
        : [];

      return {
        ...comment,
        replies: updatedReplies
      };
    });

    setComments(updatedComments);

    // You would typically call an API to save the like here
    toast.success("Liked comment!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <CommentInput onSubmit={addComment} replyingTo="SharmaScoops" />
      </div>

      <div className="flex flex-col space-y-4 mt-6">
        {isLoading ? (
          <div className="text-center py-4">Loading comments...</div>
        ) : comments.length > 0 ? (
          comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              onReply={addReply}
              onLike={handleLike}
            />
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
