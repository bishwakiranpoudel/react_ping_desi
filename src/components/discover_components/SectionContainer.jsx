import SectionHeader from "./SectionHeader";
import CardListing from "./CardListing";

function SectionContainer({ title, items, type }) {
  return (
    <div>
      <SectionHeader title={title} />
      <CardListing items={items} type={type} />
    </div>
  );
}

export default SectionContainer;
