"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

const DropdownMenuContext = createContext({});

export function DropdownMenu({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

export const DropdownMenuTrigger = React.forwardRef(
  ({ className, asChild, ...props }, ref) => {
    const { open, setOpen } = useContext(DropdownMenuContext);

    return (
      <button
        ref={ref}
        className={className}
        onClick={() => setOpen(!open)}
        {...props}
      />
    );
  }
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export const DropdownMenuContent = React.forwardRef(
  ({ className, align = "center", ...props }, ref) => {
    const { open, setOpen } = useContext(DropdownMenuContext);
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setOpen(false);
        }
      };

      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open, setOpen]);

    if (!open) return null;

    const classes = [
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      align === "start"
        ? "left-0"
        : align === "end"
        ? "right-0"
        : "left-1/2 -translate-x-1/2",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <div ref={dropdownRef} className={classes} {...props} />;
  }
);
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { setOpen } = useContext(DropdownMenuContext);

    const handleClick = (e) => {
      if (props.onClick) {
        props.onClick(e);
      }
      setOpen(false);
    };

    const classes = [
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classes} onClick={handleClick} {...props} />
    );
  }
);
DropdownMenuItem.displayName = "DropdownMenuItem";
