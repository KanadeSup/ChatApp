import { parseISO, format, addHours } from "date-fns";

export default function convertTime(time, reverse = false) {
    console.log(time)
    if (!time) return "";
    const date = parseISO(time);
    const newDate = addHours(date, 0);
    if(reverse) return format(newDate, "dd/MM/yyyy HH:mm")
    return format(newDate, "HH:mm dd/MM/yyyy");
}
export function convertDate(time) {
    const date = parseISO(time);
    const newDate = addHours(date, 0);
    return format(newDate, "dd/MM/yyyy");
}