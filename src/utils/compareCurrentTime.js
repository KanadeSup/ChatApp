import { parseISO, format, addHours } from "date-fns";
export function isBeforeCurrentDate(isoTime) {
   const date = parseISO(isoTime);
   const newDate = addHours(date, 0)
   const currentDate = new Date()
   return newDate < currentDate
}