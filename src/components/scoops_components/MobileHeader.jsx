"use client";

import { ChevronLeft, MoreVertical } from "lucide-react";
import Button from "./Button";

function MobileHeader({
  title,
  onBack,
  showBackButton = true,
  showMoreOptions = false,
  onMoreOptions,
}) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border">
      <div className="flex items-center">
        {showBackButton && (
          <Button variant="ghost" icon className="mr-2" onClick={onBack}>
            <ChevronLeft size={24} />
          </Button>
        )}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      {showMoreOptions && (
        <Button variant="ghost" icon onClick={onMoreOptions}>
          <MoreVertical size={20} />
        </Button>
      )}
    </div>
  );
}

export default MobileHeader;
