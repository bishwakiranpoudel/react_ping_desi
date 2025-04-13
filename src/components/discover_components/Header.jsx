import SearchBar from "./SearchBar";
import FilterButton from "./FilterButton";

function Header() {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex-1 mr-4">
        <SearchBar />
      </div>
      <FilterButton />
    </div>
  );
}

export default Header;
