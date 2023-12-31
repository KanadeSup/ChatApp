export function getShortDatetimeSendAt(sendAt) {
    try {
        let time = new Date(sendAt);
        const timeFormat = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        let dayFormat = time.toLocaleDateString([], { day: '2-digit', month: '2-digit' })
            .split('/').reverse().join('/');
        if (!checkIsThisYear(time)) dayFormat = dayFormat + "/" + time.getFullYear();
        if (checkIsToday(time))
            return timeFormat;
        return dayFormat + " " + timeFormat;
    } catch {
        return "";
    }
}

function checkIsToday(time) {
    try {
        const now = new Date();
        if (now.getDay() == time.getDay() &&
            now.getMonth() == time.getMonth() &&
            now.getFullYear() == time.getFullYear()) return true;
        return false;
    } catch {
        return false;
    }
}

function checkIsThisYear(time) {
    try {
        const now = new Date();
        if (now.getFullYear() == time.getFullYear())
            return true;
        return false;
    } catch {
        return false;
    }

}