import store from '../store';

export const convertUTCToLocal = (dateTime, timezoneOffset = 0) => {
    let original = new Date(dateTime);
    let offset = 0;
    offset = store.getters.loggedInUser.mytimezone;
    
    original.setTime(original.getTime() + (timezoneOffset + offset) * 60 * 60 * 1000);
    return original;
}

export const defaultFormat = (dateTime) => {
    let original = new Date(dateTime);
    const year = original.getFullYear();
    const month = original.getMonth() + 1;
    const day = original.getDate();
    const hour = original.getHours();
    const minute = original.getMinutes();
    const second = original.getSeconds();
    const mon = `${Math.floor(month / 10)}${month % 10}`;
    const d = `${Math.floor(day / 10)}${day % 10}`;
    const h = `${Math.floor(hour / 10)}${hour % 10}`;
    const min = `${Math.floor(minute / 10)}${minute % 10}`;
    const s = `${Math.floor(second / 10)}${second % 10}`;
    return `${month}/${day}/${year} ${hour}:${minute}:${second}`;
}
