"use client";
import { List, Map } from "lucide-react";

function ToggleViewButton({ viewMode, onClick }) {
  return (
    <button
      className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-1.5 bg-white"
      onClick={onClick}
    >
      <span className="text-sm">{viewMode === "list" ? "Map" : "List"}</span>
      {viewMode === "list" ? (
        <Map className="h-4 w-4" />
      ) : (
        <List className="h-4 w-4" />
      )}
    </button>
  );
}

export default ToggleViewButton;
