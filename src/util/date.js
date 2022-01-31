import date from "date-and-time";

export const getDate = (string) => {
  return date.format(new Date(string), "MMM DD, YYYY");
};
