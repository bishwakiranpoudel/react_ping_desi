"use client";

import React, { createContext, useContext, useState } from "react";
import { ChevronDown } from "lucide-react";

const SelectContext = createContext({});

export function Select({ children, value, onValueChange, defaultValue }) {
  const [selectedValue, setSelectedValue] = useState(
    value || defaultValue || ""
  );

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <SelectContext.Provider
      value={{
        value: value || selectedValue,
        onValueChange: handleValueChange,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}

export const SelectTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { value } = useContext(SelectContext);

    const classes = [
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

export const SelectValue = React.forwardRef(
  ({ className, placeholder, ...props }, ref) => {
    const { value } = useContext(SelectContext);

    const classes = ["flex-1 text-left", className].filter(Boolean).join(" ");

    return (
      <span ref={ref} className={classes} {...props}>
        {value || placeholder}
      </span>
    );
  }
);
SelectValue.displayName = "SelectValue";

export const SelectContent = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const classes = [
      "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        <div className="p-1">{children}</div>
      </div>
    );
  }
);
SelectContent.displayName = "SelectContent";

export const SelectItem = React.forwardRef(
  ({ className, children, value, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = useContext(SelectContext);
    const isSelected = selectedValue === value;

    const classes = [
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      isSelected ? "bg-accent text-accent-foreground" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={classes}
        onClick={() => onValueChange(value)}
        {...props}
      >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {isSelected && <span className="h-2 w-2 rounded-full bg-current" />}
        </span>
        {children}
      </div>
    );
  }
);
SelectItem.displayName = "SelectItem";
