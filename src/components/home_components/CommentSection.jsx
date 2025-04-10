"use client";

import { useState, useEffect } from "react";
import CommentInput from "./CommentInput";
import Comment from "./Comment";
import { postComments } from "../../services/addComment";
import { toast } from "react-toastify";

const CommentSection = ({ onCommentCountChange, postid }) => {
  console.log(postid, "post id");
  const [comments, setComments] = useState([]);

  // Calculate total comments (including replies) and update parent component
  useEffect(() => {
    const calculateTotalComments = () => {
      let total = comments.length;
      comments.forEach((comment) => {
        total += comment.replies ? comment.replies.length : 0;
      });
      return total;
    };

    const total = calculateTotalComments();
    onCommentCountChange(total);
  }, [comments, onCommentCountChange]);

  const addComment = async (text, image = null) => {
    if (!text.trim() && !image) return;

    const newComment = {
      id: Date.now(),
      author: {
        name: "You",
        username: "user",
        avatar: null,
      },
      content: text,
      image: image,
      timestamp: "Just now",
      likes: 0,
      replies: [],
    };

    setComments([...comments, newComment]);
    try {
      const response = await postComments({
        postid: postid,
        comment: text,
        image: image,
      });

      toast.success("Added comment sucssfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
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
    }
  };

  const addReply = (commentId, text, image = null) => {
    if (!text.trim() && !image) return;

    const reply = {
      id: Date.now(),
      author: {
        name: "You",
        username: "user",
        avatar: null,
      },
      content: text,
      image: image,
      timestamp: "Just now",
      likes: 0,
    };

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        };
      }
      return comment;
    });

    setComments(updatedComments);
  };

  const handleLike = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.likes + 1,
        };
      }

      // Check if the comment is in replies
      const updatedReplies = comment.replies
        ? comment.replies.map((reply) => {
            if (reply.id === commentId) {
              return {
                ...reply,
                likes: reply.likes + 1,
              };
            }
            return reply;
          })
        : [];

      return {
        ...comment,
        replies: updatedReplies,
      };
    });

    setComments(updatedComments);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">Comments</h3>

      <div className="flex flex-col space-y-4">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onReply={addReply}
            onLike={handleLike}
          />
        ))}

        <div className="mt-4 pt-4 border-t border-gray-200">
          <CommentInput onSubmit={addComment} replyingTo="SharmaScoops" />
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
