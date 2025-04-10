const HomePromotionCard = ({
  title = "Feel at Home Again",
  subtitle = "Connect with Your Desi Roots!",
  buttonText = "Explore Community",
  onButtonClick = () => {},
}) => {
  return (
    <div className="w-full max-w-full rounded-lg p-6 shadow-sm bg-[#F2F5EB] relative overflow-hidden font-afacad text-center">
      <div className="flex justify-center mb-4">
        <img
          src="/images/mandala-hands.png"
          alt="Praying hands with mandala"
          width={120}
          height={120}
        />
      </div>

      <h2 className="font-bold text-3xl text-[#2D2D2D] mb-2 font-fraunces">
        {title}
      </h2>
      <p className="text-gray-500 text-sm mb-6">{subtitle}</p>

      <button
        onClick={onButtonClick}
        className="w-full py-3 px-4 bg-[#7B189F] text-white rounded-md hover:bg-purple-800 transition-colors"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default HomePromotionCard;
