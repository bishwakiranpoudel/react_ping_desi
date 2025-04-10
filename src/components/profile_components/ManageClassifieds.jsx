import { Trash2, Pencil, Home, Tv } from "lucide-react";

function ManageClassifieds({ classifieds }) {
  // Helper function to get the appropriate icon based on type
  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "house":
        return <Home className="mr-2" size={20} />;
      case "appliance":
        return <Tv className="mr-2" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Classifieds</h1>

      <div className="w-full">
        {/* Header row */}
        <div className="grid grid-cols-3 bg-gray-100 p-3 rounded-t-md">
          <div className="text-sm text-gray-600">Type</div>
          <div className="text-sm text-gray-600">Item Details</div>
          <div className="text-sm text-gray-600 text-right">Actions</div>
        </div>

        {/* Listing rows */}
        {classifieds.map((item) => {
          const detailsMap = item.details.reduce((acc, item) => {
            acc[item.key] = item.value;
            return acc;
          }, {});
          return (
            <div
              key={item.id}
              className="grid grid-cols-3 py-4 border-b border-gray-100 items-center"
            >
              {/* Type column */}
              <div className="flex items-center">
                {getTypeIcon(item.category_name)}
                <span className="font-medium">{item.category_name}</span>
              </div>

              {/* Item Details column */}
              <div className="flex">
                <div className="w-20 h-20 rounded overflow-hidden mr-4">
                  <img
                    src={item.coverPhoto || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  {item.category_name === "House" && (
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <span className="mr-4">
                        <span className="inline-block mr-1">🛏️</span>{" "}
                        {detailsMap.bedNo} bed
                      </span>
                      <span>
                        <span className="inline-block mr-1">🚿</span>{" "}
                        {detailsMap.bathNo} bath
                      </span>
                    </div>
                  )}
                  <div className="flex items-center mt-1">
                    <span className="font-bold text-lg">
                      $
                      {typeof item.price === "number"
                        ? item.price.toLocaleString()
                        : item.price}
                    </span>
                    <span className="ml-2 px-2 py-0.5 text-xs bg-gray-800 text-white rounded">
                      {item.condition}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions column */}
              <div className="flex justify-end gap-2">
                <button className="flex items-center gap-1 px-2 py-2 rounded-full border border-gray-300 text-[#7B189F] hover:bg-gray-50">
                  <Pencil size={16} />
                  {/* <span>Edit</span> */}
                </button>
                <button className="text-gray-500 hover:text-red-500 p-2">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ManageClassifieds;
