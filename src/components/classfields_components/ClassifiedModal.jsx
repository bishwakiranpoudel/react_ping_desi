"use client";

import { useEffect } from "react";
import { Dialog, DialogContent } from "./ui/Dialog";
import { ClassifiedContent } from "./ClassifiedContent";

export function ClassifiedModal({ isOpen, onClose }) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="p-0 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        closeButtonClassName="hidden"
      >
        <ClassifiedContent onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
