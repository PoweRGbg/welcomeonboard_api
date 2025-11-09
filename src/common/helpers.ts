export function getLoggerDate(date?: Date): string {
    if (!date) {
        date = new Date();
    }

    const dateToDisplay = {
        month: date.getMonth() + 1,
        day: date.getDate(),
        year: date.getFullYear(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
    };

    Object.keys(dateToDisplay).forEach(key => {
        if (dateToDisplay[key] < 10) {
            dateToDisplay[key] = '0' + dateToDisplay[key];
        }
    });
    
    return `${dateToDisplay.year}/${dateToDisplay.month}/${dateToDisplay.day} - ${dateToDisplay.hour}:${dateToDisplay.minute}:${dateToDisplay.second} `;
}