"use client";

import React, { useState, useRef, useEffect } from "react";
import { classNames } from "../../utils/classNames";

function Popover({
  children,
  content,
  open,
  onOpenChange,
  align = "center",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(open || false);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  // Controlled component if open and onOpenChange are provided
  const isControlled = open !== undefined && onOpenChange !== undefined;

  const handleOpen = (value) => {
    if (isControlled) {
      onOpenChange(value);
    } else {
      setIsOpen(value);
    }
  };

  // Handle click outside to close popover
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        handleOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update internal state when controlled prop changes
  useEffect(() => {
    if (isControlled) {
      setIsOpen(open);
    }
  }, [open, isControlled]);

  // Clone trigger element to add ref and onClick
  const trigger = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      ref: triggerRef,
      onClick: (e) => {
        if (child.props.onClick) {
          child.props.onClick(e);
        }
        handleOpen(!isOpen);
      },
    });
  });

  // Alignment classes
  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  return (
    <div className="relative inline-block">
      {trigger}

      {isOpen && (
        <div
          ref={contentRef}
          className={classNames(
            "absolute z-50 mt-2 bg-white rounded-md shadow-lg w-40",
            alignClasses[align],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export default Popover;
