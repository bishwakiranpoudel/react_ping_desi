export default function PromotionCardLight() {
  return (
    <div className=" mx-3 mb-10">
      <div className="relative rounded-2xl overflow-hidden shadow bg-white p-4 pt-1 pb-0">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <img
            src="/images/ping-desi-logo.png"
            alt="Ping Desi logo"
            width={20}
            height={20}
            className="object-contain mr-2"
          />
          <span className="text-sm font-medium text-[#7B189F] font-afacad">
            Ping Desi
          </span>
        </div>

        {/* Vector and icon container */}
        <div className="relative flex justify-center items-center mb-6">
          <img
            src="/images/curve-vector-purple.svg"
            alt="Decorative curve"
            width={300}
            height={60}
            className="object-contain w-full absolute"
          />
          <img
            src="/images/complete-icon.svg"
            alt="Icon"
            width={60}
            height={60}
            className="relative z-10"
          />
        </div>

        {/* Text content */}
        <div className="text-center mb-6">
          <h2 className="text-lg text-[#2D0A3C] leading-tight font-fraunces">
            Let the Community In on
            <br /> Your Business & Events!
          </h2>
        </div>

        {/* Bottom section with button */}
        <div className="relative">
          <div className="flex justify-center mb-[-1rem] relative z-10">
            <button
              className="bg-[#7B189F] text-white font-medium py-2 px-8 rounded-full shadow font-afacad"
              style={{ width: "120px" }}
            >
              Promote
            </button>
          </div>
          <div className="h-10 bg-gray-100 rounded-t-2xl"></div>
        </div>
      </div>
    </div>
  );
}
