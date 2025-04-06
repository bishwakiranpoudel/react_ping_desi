"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";

export const Checkbox = React.forwardRef(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(checked || false);

    const handleChange = () => {
      const newValue = !isChecked;
      setIsChecked(newValue);
      if (onCheckedChange) {
        onCheckedChange(newValue);
      }
    };

    const classes = [
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        type="button"
        ref={ref}
        className={classes}
        onClick={handleChange}
        aria-checked={checked !== undefined ? checked : isChecked}
        {...props}
      >
        {(checked !== undefined ? checked : isChecked) && (
          <Check className="h-3 w-3 text-white" />
        )}
      </button>
    );
  }
);
Checkbox.displayName = "Checkbox";
