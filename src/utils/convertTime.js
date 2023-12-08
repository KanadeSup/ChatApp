import { parseISO, format, addHours } from "date-fns";

export default function convertTime(time) {
    const date = parseISO(time);
    const newDate = addHours(date, 0);
    return format(newDate, "HH:mm:ss dd/MM/yyyy");
}
