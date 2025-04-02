import { Flower } from "lucide-react";

// Component for the circular icon with colored border
const AllergenIcon = ({ icon, borderColor, alt }) => (
  <div
    className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white font-afacad"
    style={{ border: `1px solid ${borderColor}` }}
  >
    <img
      src={icon || "/placeholder.svg"}
      alt={alt}
      width={20}
      height={20}
      className="object-contain"
    />
  </div>
);

// Component for each allergen item
const AllergenItem = ({ icon, name, level, color, alt }) => (
  <div className="flex flex-col items-center">
    <AllergenIcon icon={icon} borderColor={color} alt={alt} />
    <div className="mt-1 text-center">
      <div className="text-gray-700 text-sm font-medium">{name}</div>
      <div className="text-sm font-medium" style={{ color }}>
        {level}
      </div>
    </div>
  </div>
);

// Map level to color
const levelToColor = {
  High: "#CA1C1E", // Red
  Medium: "#E9B949", // Yellow
  Low: "#4EA737", // Green
};

export default function AllergyCard({
  allergens = [
    {
      icon: "/images/tree-icon.png",
      name: "Tree",
      level: "Low",
      alt: "Tree icon",
    },
    {
      icon: "/images/ragweed-icon.png",
      name: "Ragweed",
      level: "Medium",
      alt: "Ragweed icon",
    },
    {
      icon: "/images/mold-icon.png",
      name: "Mold",
      level: "Low",
      alt: "Mold icon",
    },
    {
      icon: "/images/grass-icon.png",
      name: "Grass",
      level: "High",
      alt: "Grass icon",
    },
  ],
  backgroundImg = "/images/textured-bg.png",
  title = "Allergy Alert: High Pollen Count",
  description = "High pollen levels expected this afternoon. If you're allergy-prone, consider limiting outdoor time and taking antihistamines.",
  alertIcon = <Flower className="h-5 w-5 text-gray-800 mt-0.5" />,
}) {
  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-2xl overflow-hidden shadow-sm border">
        {/* Top section with allergens */}
        <div className="relative">
          {/* Background Image with blur effect */}
          <div className="absolute inset-0">
            <div className="relative w-full h-full">
              <img
                src={backgroundImg}
                alt="Textured background"
                className="object-cover w-full h-full absolute"
              />
              {/* Dark overlay with blur */}
              <div
                className="absolute inset-0"
                style={{
                  backdropFilter: "blur(2px)",
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                }}
              ></div>
            </div>
          </div>

          {/* Grid layout with proper dividers */}
          <div className="relative z-10 grid grid-cols-2 divide-x divide-gray-300">
            {/* Top row */}
            <div className="p-2 flex flex-col items-center justify-center">
              <AllergenItem
                icon={allergens[0].icon}
                name={allergens[0].name}
                level={allergens[0].level}
                color={levelToColor[allergens[0].level]}
                alt={allergens[0].alt}
              />
            </div>

            <div className="p-2 flex flex-col items-center justify-center">
              <AllergenItem
                icon={allergens[1].icon}
                name={allergens[1].name}
                level={allergens[1].level}
                color={levelToColor[allergens[1].level]}
                alt={allergens[1].alt}
              />
            </div>

            {/* Horizontal divider */}
            <div className="col-span-2 h-px bg-gray-300"></div>

            {/* Bottom row */}
            <div className="p-2 flex flex-col items-center justify-center">
              <AllergenItem
                icon={allergens[2].icon}
                name={allergens[2].name}
                level={allergens[2].level}
                color={levelToColor[allergens[2].level]}
                alt={allergens[2].alt}
              />
            </div>

            <div className="p-2 flex flex-col items-center justify-center">
              <AllergenItem
                icon={allergens[3].icon}
                name={allergens[3].name}
                level={allergens[3].level}
                color={levelToColor[allergens[3].level]}
                alt={allergens[3].alt}
              />
            </div>
          </div>
        </div>

        {/* Bottom section with alert */}
        <div className="p-4 bg-white">
          <div className="flex items-start gap-2 mb-2">
            {alertIcon}
            <div>
              <div className="font-medium text-gray-800">{title}</div>
              <p className="text-gray-600 text-sm mt-1">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
