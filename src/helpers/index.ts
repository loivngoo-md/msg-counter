
export function calcTime(offset) {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000 * offset));

    // return time as a string
    return nd.toLocaleString();
}



export function getVietnamTime() {
    var today = new Date();
    var offset = 14; // Vietnam timezone offset
    var utc = today.getTime() + (today.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offset));
}

export function convertDateTimeVNToTimestamp(dateTimeVN: string): number {
    var offset = 7; // Vietnam timezone offset
    var vnTime = new Date(dateTimeVN);
    var utc = vnTime.getTime() - (3600000 * offset);
    return Math.floor(utc / 1000);
}

export function convertTimestampToDateTime(timestamp) {
    var date = new Date(timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    return date.toLocaleDateString() + " " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}