"use client";

function TabNavigation({ tabs, activeTab, onTabChange }) {
  console.log(tabs, "tabs");
  return (
    <div className="mt-4 overflow-x-auto">
      <div className="flex space-x-6 pb-2 min-w-max">
        {tabs.map((tab, index) => (
          <TabItem
            key={index}
            name={tab.title}
            icon={tab.icon}
            isActive={tab.title === activeTab}
            onClick={() => onTabChange(tab.title)}
          />
        ))}
      </div>
      <div className="h-px bg-gray-200 mt-1"></div>
    </div>
  );
}

function TabItem({ name, icon, isActive, onClick }) {
  return (
    <div
      className={`flex flex-col items-center space-y-1 cursor-pointer relative ${
        isActive ? "opacity-100" : "opacity-80"
      }`}
      onClick={onClick}
    >
      <div
        className={`p-2 bg-white rounded-full shadow-sm ${
          isActive ? "ring-1 ring-gray-200" : ""
        }`}
      >
        {icon}
      </div>
      <span
        className={`text-xs whitespace-nowrap ${
          isActive ? "text-black font-medium" : "text-gray-700"
        }`}
      >
        {name}
      </span>
      {isActive && (
        <div className="absolute -bottom-2 w-full h-0.5 bg-black"></div>
      )}
    </div>
  );
}

export default TabNavigation;
