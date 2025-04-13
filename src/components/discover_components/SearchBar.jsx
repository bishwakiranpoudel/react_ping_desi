function SearchBar() {
  return (
    <div className="relative w-full">
      <div className="relative rounded-full bg-white shadow-sm flex items-center px-4 py-2">
        <svg
          className="h-5 w-5 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Nearby Indian restaurant, Roommates eat..."
          className="ml-2 flex-1 border-none outline-none bg-transparent text-sm text-gray-600"
        />
      </div>
    </div>
  );
}

export default SearchBar;
