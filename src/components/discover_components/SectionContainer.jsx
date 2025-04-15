import SectionHeader from "./SectionHeader";
import CardListing from "./CardListing";

function SectionContainer({ title, items, type, location, tryNewPlaces }) {
  return (
    <div>
      <SectionHeader title={title} />
      <CardListing
        items={items}
        type={type}
        location={location}
        tryNewPlaces={tryNewPlaces}
      />
    </div>
  );
}

export default SectionContainer;
