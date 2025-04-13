function SectionHeader({ title }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <button className="text-xs text-gray-600 flex items-center">
        View all →
      </button>
    </div>
  );
}

export default SectionHeader;
