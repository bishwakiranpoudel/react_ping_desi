"use client";

import React, { useState } from "react";
import { classNames } from "../../utils/classNames";

function TabsList({ children, className = "" }) {
  return (
    <div className={classNames("flex border-b", className)}>{children}</div>
  );
}

function TabsTrigger({ children, value, active, onClick, className = "" }) {
  return (
    <button
      className={classNames(
        "px-4 py-2 text-sm font-medium",
        active
          ? "border-b-2 border-primary text-primary"
          : "text-gray-500 hover:text-gray-700",
        className
      )}
      onClick={() => onClick(value)}
    >
      {children}
    </button>
  );
}

function TabsContent({ children, value, activeValue, className = "" }) {
  if (value !== activeValue) return null;

  return <div className={classNames("py-4", className)}>{children}</div>;
}

function Tabs({
  children,
  defaultValue,
  value,
  onValueChange,
  className = "",
}) {
  const [activeTab, setActiveTab] = useState(value || defaultValue);

  const isControlled = value !== undefined && onValueChange !== undefined;

  const handleTabChange = (tabValue) => {
    if (isControlled) {
      onValueChange(tabValue);
    } else {
      setActiveTab(tabValue);
    }
  };

  // Update internal state when controlled prop changes
  React.useEffect(() => {
    if (isControlled) {
      setActiveTab(value);
    }
  }, [value, isControlled]);

  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === TabsContent) {
            return React.cloneElement(child, {
              activeValue: activeTab,
            });
          } else if (child.type === TabsList) {
            return React.cloneElement(child, {
              children: React.Children.map(child.props.children, (trigger) => {
                if (
                  React.isValidElement(trigger) &&
                  trigger.type === TabsTrigger
                ) {
                  return React.cloneElement(trigger, {
                    active: trigger.props.value === activeTab,
                    onClick: handleTabChange,
                  });
                }
                return trigger;
              }),
            });
          }
        }
        return child;
      })}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
