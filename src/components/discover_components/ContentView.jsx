import SectionContainer from "./SectionContainer";
import { restaurantData } from "./data/restaurant-data";
import { groceryData } from "./data/grocery-data";
import { homeBasedData } from "./data/home-based-data";

function ContentView({ activeTab }) {
  // Return different content based on active tab
  switch (activeTab) {
    case "Restaurants":
      return (
        <div className="mt-6 space-y-8">
          <SectionContainer
            title="Near by"
            items={restaurantData}
            type="restaurant"
          />
          <SectionContainer
            title="Try new"
            items={restaurantData}
            type="restaurant"
          />
        </div>
      );

    case "Groceries":
      return (
        <div className="mt-6 space-y-8">
          <SectionContainer
            title="Popular Stores"
            items={groceryData}
            type="grocery"
          />
          <SectionContainer
            title="Trending"
            items={groceryData}
            type="grocery"
          />
        </div>
      );

    case "Home Based":
      return (
        <div className="mt-6 space-y-8">
          <SectionContainer
            title="Top Rated"
            items={homeBasedData}
            type="home-based"
          />
          <SectionContainer
            title="New Arrivals"
            items={homeBasedData}
            type="home-based"
          />
        </div>
      );

    default:
      // Fallback to Restaurants tab if something goes wrong
      return (
        <div className="mt-6 space-y-8">
          <SectionContainer
            title="Near by"
            items={restaurantData}
            type="restaurant"
          />
          <SectionContainer
            title="Try new"
            items={restaurantData}
            type="restaurant"
          />
        </div>
      );
  }
}

export default ContentView;
