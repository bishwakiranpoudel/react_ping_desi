export default function PromotionCard() {
  return (
    <div className="max-w-md mx-auto mb-6">
      <div className="relative rounded-3xl overflow-hidden shadow-md bg-[#C6EB75] pt-6 pl-6 pr-6 pb-0">
        {/* Logo */}
        <div className="flex items-center mb-12">
          <div className="relative w-8 h-8 mr-2">
            <img
              src="/images/desi360-logo.png"
              alt="Desi360 logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold text-[#7B189F] font-afacad">
            Desi360 Ai
          </span>
        </div>

        {/* Vector and icon container - centered */}
        <div className="relative flex justify-center items-center mb-8">
          {/* Curved vector behind icon */}
          <div className="absolute w-full">
            <img
              src="/images/wave-curve.svg"
              alt="Decorative wave"
              width={358}
              height={71}
              className="object-contain w-full"
            />
          </div>

          {/* Complete icon with wiggly circle - centered */}
          <div className="relative z-10 w-20 h-20">
            <img
              src="/images/complete-icon.svg"
              alt="Icon"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        </div>

        {/* Text content */}
        <div className="text-center mb-12">
          <h2 className="text-3x text-[#2D0A3C] leading-tight text-2xl font-fraunces">
            Let the Community In on
            <br />
            Your Business & Events!
          </h2>
        </div>

        {/* Bottom section with button */}
        <div className="relative flex flex-col items-center">
          {/* Button positioned to sit at the top edge of the purple section */}
          <button
            className="bg-[#7B189F] text-white font-medium py-3 px-12 rounded-full border-2 border-white shadow-md relative z-10 flex items-center justify-center font-afacad"
            style={{
              width: "170px",
              marginBottom: "-1.5rem", // This positions the button to overlap with the purple section
            }}
          >
            Promote
          </button>

          {/* Bottom purple section using SVG - 70% width and centered, extending to bottom */}
          <div className="w-[90%]">
            <div className="relative w-full" style={{ height: "80px" }}>
              <img
                src="/images/bottom-curve.svg"
                alt="Purple background"
                className="object-cover object-top w-full h-full absolute"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
