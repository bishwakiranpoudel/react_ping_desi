"use client";

import { useState } from "react";
import CommentInput from "./CommentInput";
import { Heart, MessageCircle } from "lucide-react";

const Comment = ({ comment, onReply, onLike }) => {
  const [isReplying, setIsReplying] = useState(false);

  const handleReply = (text, image) => {
    onReply(comment.id, text, image);
    setIsReplying(false);
  };

  return (
    <div className="py-3 border-b border-gray-200 last:border-b-0">
      <div className="flex items-start">
        {comment.author.avatar && (
          <img
            src={comment.author.avatar || "/placeholder.svg"}
            alt={comment.author.name}
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
        )}

        <div className="flex-1">
          <div className="flex items-center flex-wrap gap-1">
            <span className="font-bold text-sm">{comment.author.name}</span>
            {comment.author.username && (
              <span className="text-gray-500 text-sm">
                @{comment.author.username}
              </span>
            )}
            <span className="text-gray-500 text-sm">· {comment.timestamp}</span>
          </div>

          {comment.replyingTo && (
            <div className="text-gray-500 text-sm mt-0.5">
              Replying to @{comment.replyingTo}
            </div>
          )}

          <div className="mt-2">
            {comment.image && (
              <div className="mt-2 mb-2 rounded-lg overflow-hidden">
                <img
                  src={comment.image || "/placeholder.svg"}
                  alt="Comment attachment"
                  className="w-full max-h-72 object-cover rounded-lg"
                />
              </div>
            )}

            <p className="text-sm leading-relaxed mb-2">{comment.content}</p>
          </div>

          <div className="flex items-center gap-4 mt-1">
            <button
              className="flex items-center text-gray-500 hover:text-red-500 transition p-1 rounded-full hover:bg-red-50"
              onClick={() => onLike(comment.id)}
            >
              <Heart size={16} />
              {comment.likes > 0 && (
                <span className="text-xs ml-1">{comment.likes}</span>
              )}
            </button>

            <button
              className="flex items-center text-gray-500 hover:text-blue-500 transition p-1 rounded-full hover:bg-blue-50"
              onClick={() => setIsReplying(!isReplying)}
            >
              <MessageCircle size={16} />
            </button>
          </div>

          {isReplying && (
            <div className="mt-3">
              <CommentInput
                onSubmit={handleReply}
                replyingTo={comment.author.username || comment.author.name}
              />
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 pl-4 border-l-2 border-gray-200">
              {comment.replies.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={{
                    ...reply,
                    replyingTo: comment.author.username || comment.author.name,
                  }}
                  onReply={onReply}
                  onLike={onLike}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
