import { Calendar, Pencil, Trash2 } from "lucide-react";

function ManageEvents({ events }) {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Events</h1>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="rounded-lg border border-gray-100 bg-white p-4"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <div className="flex items-center text-gray-600 mt-1">
                  <Calendar size={16} className="mr-2" />
                  <span>{event.date}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="text-[#7B189F] hover:text-[#6A1587] font-medium">
                  Track Request
                </button>
                <div className="w-px h-6 bg-gray-200 hidden md:block"></div>
                <button className="text-[#7B189F] hover:text-[#6A1587] font-medium flex items-center gap-1">
                  <Pencil size={16} />
                  Edit Event
                </button>
                <div className="w-px h-6 bg-gray-200 hidden md:block"></div>
                <button className="text-[#7B189F] hover:text-[#6A1587] font-medium flex items-center gap-1">
                  <Trash2 size={16} />
                  Delete Event
                </button>
              </div>
            </div>
          </div>
        ))}

        {events.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            You don't have any events yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageEvents;
