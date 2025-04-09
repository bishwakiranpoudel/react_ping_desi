"use client";

import { useState, useEffect } from "react";
import CommentInput from "./CommentInput";
import Comment from "./Comment";

const CommentSection = ({ onCommentCountChange }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: {
        name: "Aarav Patel",
        username: "AaravAdventures",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lA9AoCnViwHqU7TtSRdbzwG5evxw63.png",
      },
      content:
        "Wow, that sounds incredible! The Spice Lounge is on my must-visit list now, especially for the Biriyani. Thanks for the recommendation! Can't wait to experience the vibe myself.",
      image: "https://pingdesi-prod.s3.us-east-2.amazonaws.com/freshmind.jpg",
      timestamp: "Just now",
      likes: 0,
      replies: [],
    },
  ]);

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

  const addComment = (text, image = null) => {
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
