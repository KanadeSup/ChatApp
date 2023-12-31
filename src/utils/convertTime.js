import { parseISO, format, addHours } from "date-fns";

export default function convertTime(time, reverse = false) {
    const date = parseISO(time);
    const newDate = addHours(date, 0);
    if(reverse) return format(newDate, "dd/MM/yyyy HH:mm")
    return format(newDate, "HH:mm:ss dd/MM/yyyy");
}
