"use strict";
const events = [
    { name: "Event 1", reminderTime: 60 },
    { name: "Event 2", reminderTime: 30 },
];
function checkEventReminder() {
    setInterval(() => {
        const now = new Date();
        events.forEach((event) => {
            const expirationTime = new Date(event.reminderTime);
            const reminderTime = new Date(expirationTime.getTime() - event.reminderTime * 60000); //Convert minutes to milliseconds
            if (now >= reminderTime && now < expirationTime) {
                alert(`${event.name} will expire in ${event.reminderTime} minutes.`);
            }
        });
    }, 10000);
}
checkEventReminder();
