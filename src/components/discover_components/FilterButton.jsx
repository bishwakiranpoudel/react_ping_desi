function FilterButton({ onClick }) {
  return (
    <button
      className="flex items-center space-x-1 border border-gray-300 rounded-md px-3 py-1.5 bg-white"
      onAbort={onClick}
    >
      <span className="text-sm">Filter</span>
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 4h18M3 12h18M3 20h18"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M8 16h8" />
      </svg>
    </button>
  );
}

export default FilterButton;
