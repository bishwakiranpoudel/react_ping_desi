"use client";
import { useState, useRef } from "react";
import { Smile, ImageIcon, Send } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

const CommentSection = ({
  postId,
  comments = [],
  onAddComment,
  showComments,
}) => {
  const [newComment, setNewComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Dummy comments for initial display
  const [commentsList, setCommentsList] = useState(
    comments.length > 0
      ? comments
      : [
          {
            id: 1,
            username: "sarah_j",
            avatar:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%281%29-VNHYdwoXdSCUtVSUkbo0TIIpdt9Mzf.png",
            content: "This is amazing! Love the design 😍",
            timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          },
          {
            id: 2,
            username: "mike_design",
            avatar:
              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
            content: "Great work! Keep it up 👏",
            timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          },
        ]
  );

  const handleAddComment = () => {
    if (newComment.trim() === "" && !selectedImage) return;

    const newCommentObj = {
      id: Date.now(),
      username: localStorage.getItem("username") || "user",
      avatar:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%20%281%29-VNHYdwoXdSCUtVSUkbo0TIIpdt9Mzf.png",
      content: newComment,
      timestamp: new Date().toISOString(),
      image: selectedImage,
    };

    setCommentsList([...commentsList, newCommentObj]);
    setNewComment("");
    setSelectedImage(null);

    if (onAddComment) {
      onAddComment(newCommentObj);
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setNewComment((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  // Function to calculate time ago
  const getTimeAgo = (timestamp) => {
    const created = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - created) / 1000);

    if (diffInSeconds < 60) return "Just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);

    return diffInDays === 1 ? "1 day ago" : `${diffInDays} days ago`;
  };

  return (
    showComments && (
      <div className="comment-section">
        {/* Comments List */}
        <div className="comments-list">
          {commentsList.map((comment) => (
            <div key={comment.id} className="comment">
              <img
                src={comment.avatar}
                alt={comment.username}
                className="avatar-circle"
              />
              <div className="comment-body">
                <div className="comment-header">
                  <span className="username">{comment.username}</span>
                  <span className="timestamp">
                    {getTimeAgo(comment.timestamp)}
                  </span>
                </div>
                <p>{comment.content}</p>
                {comment.image && (
                  <img
                    src={comment.image}
                    alt="Attached"
                    className="attached-image"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment Section */}
        <div className="add-comment">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          {selectedImage && (
            <div className="image-preview">
              <img src={selectedImage} alt="Preview" />
              <button onClick={handleRemoveImage}>Remove</button>
            </div>
          )}
          <button onClick={() => fileInputRef.current.click()}>
            <ImageIcon />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <Smile />
          </button>
          {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
          <button onClick={handleAddComment}>
            <Send />
          </button>
        </div>
      </div>
    )
  );
};

export default CommentSection;
