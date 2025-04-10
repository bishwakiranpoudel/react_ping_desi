"use client";

import { PlusCircle } from "lucide-react";

function FloatingActionButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-[4.5rem] right-[1.5rem] w-14 h-14 rounded-full bg-[#7B189F] flex items-center justify-center shadow-md border-none cursor-pointer"
    >
      <PlusCircle size={32} color="white" />
    </button>
  );
}

export default FloatingActionButton;
