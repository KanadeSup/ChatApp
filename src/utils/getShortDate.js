export function getShortDate(date) {
    try {
        let time = new Date(date);
        let dayFormat = time.toLocaleDateString([], { day: '2-digit', month: '2-digit' })
            .split('/').reverse().join('/');
        dayFormat = dayFormat + "/" + time.getFullYear();
        if (dayFormat.includes("Invalid")) return "";
        return dayFormat;
    } catch {
        return "";
    }

}