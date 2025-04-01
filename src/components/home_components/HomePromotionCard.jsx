const HomePromotionCard = ({
  title = "Promotion Title",
  content = "This is a promotional card with default content.",
}) => {
  return (
    <div className="h-[105px] border rounded-lg p-4 shadow-sm bg-[#F2F5EB] relative mb-4 overflow-hidden font-afacad">
      <h3 className="font-medium text-lg">{title}</h3>
      <p className="text-gray-600 text-sm">{content}</p>
    </div>
  );
};

export default HomePromotionCard;
