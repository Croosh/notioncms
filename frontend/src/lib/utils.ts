export const getDate = (date: string) => {
  const nwedate = new Date(date);

  // Define an array of month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the day, month, and year from the Date object
  const day = nwedate.getDate();
  const month = months[nwedate.getMonth()];
  const year = nwedate.getFullYear();

  // Format and return the date string
  return `${day} ${month}, ${year}`;
};
