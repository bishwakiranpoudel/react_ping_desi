import { X } from "react-feather";

const NotificationCard = ({
  title = "New Notification Card",
  description = "This is a notification card that can be dismissed.",
  onClose,
}) => {
  return (
    <div className="h-[105px] border rounded-lg p-4 shadow-sm bg-[#F2F5EB] relative mb-4 overflow-hidden font-afacad">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
      <h3 className="font-medium mb-2 truncate">{title}</h3>
      <p className="text-gray-600 text-sm truncate">{description}</p>
    </div>
  );
};

export default NotificationCard;
