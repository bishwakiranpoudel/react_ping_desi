import React, { useState } from "react";

const NotificationCard = ({
  title = "Discover all things Desi",
  content = "All in one place, Download App and experience seamless interactions in your community!",
  onClose,
  isMobile = false,
}) => {
  if (isMobile) {
    return (
      <div className="relative h-auto rounded-lg shadow-sm bg-[#F2F5EB] mb-4 overflow-hidden font-afacad">
        {/* Background Mandala (positioned absolutely) */}
        <div className="absolute right-0 top-0 w-full h-full opacity-10 pointer-events-none">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Colorful%20Mandala%20Rangoli%20Illustration%202-OexUTcP6Fqohg7yRlLPLndE4QHD6QB.svg"
            alt="Background Mandala"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>

        {/* Close Button */}
        <button
          className="absolute top-2 right-2 z-10"
          onClick={onClose}
          aria-label="Close"
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%20%283%29-jwSNROt4txXPJSPXQag1GwVCMFPFQK.svg"
            alt="Close"
            width={24}
            height={24}
          />
        </button>

        <div className=" items-center p-4 gap-4">
          {/* Phone Image */}

          {/* Content */}
          <div className="">
            <div className="flex items-center gap-1 mb-1">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-logo-ipttuLtbXkSpBBKOtZc56M04vgaf4I.svg"
                alt="Ping Desi Logo"
                width={16}
                height={16}
              />
              <span className="text-purple-600 text-sm font-medium">
                Ping Desi
              </span>
            </div>

            <h3 className="font-bold text-xl text-[#2B3F01] mb-1 font-fraunces">
              {title}
            </h3>
            <p className="text-gray-700 text-sm mb-3">{content}</p>
          </div>
          <div>
            {/* App Store Buttons */}
            <div className="flex flex-wrap gap-2">
              <a href="#" className="h-8">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-on-the-app-store-apple-logo-svgrepo-com%201-IIS3UHJPhxe7pkO2z90baSIKjxO9w7.svg"
                  alt="Download on App Store"
                  width={120}
                  height={36}
                />
              </a>
              <a href="#" className="h-8">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_Play_Store_badge_EN%201-pC0zVKtBIj1Q7E7WGp1juUFzixpqP4.svg"
                  alt="Get it on Google Play"
                  width={135}
                  height={36}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-auto rounded-lg shadow-sm bg-[#F2F5EB] mb-4 overflow-hidden font-afacad">
      {/* Background Mandala (positioned absolutely) */}
      <div className="absolute right-0 top-0 w-full h-full opacity-10 pointer-events-none">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Colorful%20Mandala%20Rangoli%20Illustration%202-OexUTcP6Fqohg7yRlLPLndE4QHD6QB.svg"
          alt="Background Mandala"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>

      {/* Close Button */}
      <button
        className="absolute top-2 right-2 z-10"
        onClick={onClose}
        aria-label="Close"
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%20%283%29-jwSNROt4txXPJSPXQag1GwVCMFPFQK.svg"
          alt="Close"
          width={24}
          height={24}
        />
      </button>

      <div className="flex items-center p-4 gap-4">
        {/* Phone Image */}
        <div className="flex-shrink-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Frame%20%282%29-XR9vuZgw0jiH5tHGbdz8su2qwZPmSr.svg"
            alt="Ping Desi App"
            width={94}
            height={110}
            className="object-contain"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-logo-ipttuLtbXkSpBBKOtZc56M04vgaf4I.svg"
              alt="Ping Desi Logo"
              width={16}
              height={16}
            />
            <span className="text-purple-600 text-sm font-medium">
              Ping Desi
            </span>
          </div>

          <h3 className="font-bold text-xl text-[#2B3F01] mb-1 font-fraunces">
            {title}
          </h3>
          <p className="text-gray-700 text-sm mb-3">{content}</p>
        </div>
        <div>
          {/* App Store Buttons */}
          <div className="flex flex-wrap gap-2">
            <a href="#" className="h-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download-on-the-app-store-apple-logo-svgrepo-com%201-IIS3UHJPhxe7pkO2z90baSIKjxO9w7.svg"
                alt="Download on App Store"
                width={120}
                height={36}
              />
            </a>
            <a href="#" className="h-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Google_Play_Store_badge_EN%201-pC0zVKtBIj1Q7E7WGp1juUFzixpqP4.svg"
                alt="Get it on Google Play"
                width={135}
                height={36}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;

// {isFirstCardVisible && (
//   <NotificationCard
//     onClose={handleCloseClick}
//     isMobile={isMobile}
//   />
// )}
