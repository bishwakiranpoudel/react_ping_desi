"use client";

import React, { createContext, useContext, useEffect } from "react";
import { X } from "lucide-react";

const DialogContext = createContext({});

export function Dialog({ children, open, onOpenChange }) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

export const DialogContent = React.forwardRef(
  ({ className, children, closeButtonClassName, ...props }, ref) => {
    const { open, onOpenChange } = useContext(DialogContext);

    // Prevent scrolling when dialog is open
    useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }

      return () => {
        document.body.style.overflow = "auto";
      };
    }, [open]);

    if (!open) return null;

    const dialogClasses = [
      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const closeButtonClasses = [
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
      closeButtonClassName,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <>
        <div
          className="fixed inset-0 z-50 bg-black/80"
          onClick={() => onOpenChange(false)}
        />
        <div ref={ref} className={dialogClasses} {...props}>
          {children}
          <button
            className={closeButtonClasses}
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </>
    );
  }
);
DialogContent.displayName = "DialogContent";
