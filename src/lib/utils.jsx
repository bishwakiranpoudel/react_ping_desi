export function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}
export function convertDateToObject(dateStr) {
    // Convert the string to a Date object
    const dateObj = new Date(dateStr);

    // Format the output dynamically
    const formattedDate = {
        day: dateObj.getUTCDate(),
        month: dateObj.toLocaleString('en-US', { month: 'short' }), // Abbreviated month name
        year: dateObj.getUTCFullYear()
    };

    return formattedDate;
}

