"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { classNames } from "../../utils/classNames";

function Dialog({
  open,
  onOpenChange,
  children,
  title,
  description,
  className = "",
}) {
  // Prevent body scroll when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={classNames(
          "bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-auto",
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h2 className="text-lg font-semibold">{title}</h2>
              {description && (
                <p className="text-sm text-gray-500">{description}</p>
              )}
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default Dialog;
