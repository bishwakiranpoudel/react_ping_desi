import SectionContainer from "./SectionContainer";

function ContentView({ activeTab, results, loading, tryNewPlaces }) {
  // Return different content based on active tab
  switch (activeTab) {
    case "Restaurants":
      return (
        <div className="mt-6 space-y-8">
          <SectionContainer title="Near by" items={results} type="restaurant" />
          <SectionContainer
            title="Try new"
            items={tryNewPlaces}
            type="restaurant"
          />
        </div>
      );

    case "Groceries":
      return (
        <div className="mt-6 space-y-8">
          <SectionContainer
            title="Popular Stores"
            items={results}
            type="grocery"
          />
          <SectionContainer
            title="Trending"
            items={tryNewPlaces}
            type="grocery"
          />
        </div>
      );

    case "Home Based":
      return (
        <div className="mt-6 space-y-8">
          <SectionContainer
            title="Top Rated"
            items={results}
            type="home-based"
          />
          <SectionContainer
            title="New Arrivals"
            items={tryNewPlaces}
            type="home-based"
          />
        </div>
      );

    default:
      // Fallback to Restaurants tab if something goes wrong
      return (
        <div className="mt-6 space-y-8">
          <SectionContainer title="Near by" items={results} type="restaurant" />
          <SectionContainer
            title="Try new"
            items={tryNewPlaces}
            type="restaurant"
          />
        </div>
      );
  }
}

export default ContentView;
