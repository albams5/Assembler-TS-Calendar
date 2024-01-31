import { getEventsFromLS } from '../globalFunctions.js'

export function checkEventReminder() {

    const events = getEventsFromLS()

    const filterEvents =  events.filter(event => !event.notificated);

    const notFilteredEvents = events.filter( event => event.notificated);

    const returnedEvents = [...notFilteredEvents]

    filterEvents.forEach((event) => {
        const startTime = new Date( event.initialDate )
        const expirationTime = startTime.getTime();
        const actualTime = Date.now();
        const reminderTimeMilli =  Number(event.alertTime) * 60 * 1000;
        const timeLeft = expirationTime - actualTime;
        const updatedEvent = {...event}
        if (timeLeft <=  reminderTimeMilli && !event.notificated ) {
            updatedEvent.notificated = true            
            alert(`reminder: The event ${event.title} starts in less than ${event.alertTime} minutes!`);
        }
        returnedEvents.push(updatedEvent)
    });

    const LSData:string = localStorage.getItem('calendar')!;

    const currentMonth = JSON.parse(LSData).currentMonth;

    const newCalendar = JSON.stringify( { currentMonth,  eventList: returnedEvents });

    localStorage.setItem('calendar', newCalendar );
}
