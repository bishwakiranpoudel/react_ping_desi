"use client";

import React, { createContext, useContext, useState } from "react";

const RadioGroupContext = createContext({});

export const RadioGroup = React.forwardRef(
  ({ className, value, onValueChange, defaultValue, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = useState(
      value || defaultValue || ""
    );

    const handleValueChange = (newValue) => {
      setSelectedValue(newValue);
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    const classes = ["space-y-2", className].filter(Boolean).join(" ");

    return (
      <RadioGroupContext.Provider
        value={{
          value: value || selectedValue,
          onValueChange: handleValueChange,
        }}
      >
        <div ref={ref} className={classes} {...props} />
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

export const RadioGroupItem = React.forwardRef(
  ({ className, value, ...props }, ref) => {
    const { value: selectedValue, onValueChange } =
      useContext(RadioGroupContext);
    const checked = selectedValue === value;

    const classes = [
      "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      checked ? "bg-primary" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classes}
        onClick={() => onValueChange(value)}
        aria-checked={checked}
        {...props}
      >
        {checked && (
          <span className="flex items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-white" />
          </span>
        )}
      </button>
    );
  }
);
RadioGroupItem.displayName = "RadioGroupItem";
