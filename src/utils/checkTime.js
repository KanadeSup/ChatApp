function checkTime(timeStart, timeEnd) {
    let now = new Date();
    timeStart = new Date(timeStart);
    timeEnd = new Date(timeEnd);

    if (now < timeStart) {
        return 0;
    } else if (now >= timeStart && now <= timeEnd) {
        return 1;
    } else {
        return 2;
    }
}

export default checkTime;