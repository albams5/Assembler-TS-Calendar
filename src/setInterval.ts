    interface Eventos {
    name: string;
    Time: number;
    startTime:  Date;
    notificated: boolean;
    }

    const events: Eventos[] = [
    { name: "Event 1", Time: 60, startTime:  new Date('January 31, 18 00:00'), notificated: false},
    { name: "Event 2", Time: 30, startTime:  new Date('January 31, 18 00:00'), notificated: false },
    ];



    function checkEventReminder() {
    const filterEvents =  events.filter(event => !event.notificated);
    filterEvents.forEach((event) => {
    const expirationTime = event.startTime.getTime();
    const actualTime = Date.now();
    const reminderTimeMilli =  event.Time * 60 * 1000;
    const timeLeft = expirationTime - actualTime;
    if (timeLeft <=  reminderTimeMilli && !event.notificated ) {
        event.notificated =  true;
        alert(`reminder: The event ${event.name} starts in less than ${event.Time} minutes!`);
    }
    });
    }
 setInterval( checkEventReminder, 10000);