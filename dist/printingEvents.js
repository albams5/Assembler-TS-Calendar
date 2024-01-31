import { showInfoModal } from "./infoModal.js";
import { showInfoModalHover, closeModalHover } from "./hoverModal.js";
const getEventsFromLS = () => {
    const LSData = localStorage.getItem('calendar');
    const events = JSON.parse(LSData).eventList;
    return events;
};
const getListOfDaysBetweenTwoDates = (startDate, endDate) => {
    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);
    const listOfDays = [];
    for (let date = firstDate; date <= secondDate; date.setDate(date.getDate() + 1)) {
        // Añadir la fecha al array de días (clonando para evitar referencia)
        listOfDays.push(`${new Date(date).getMonth() + 1}-${new Date(date).getDate()}-${new Date(date).getFullYear()}`);
    }
    return listOfDays;
};
const getCircleColor = (eventType) => {
    if (eventType === "Meeting")
        return "bg-lime-300";
    else if (eventType === "Personal")
        return "bg-red-300";
    else if (eventType === "Study")
        return "bg-blue-300";
    else if (eventType === "Other")
        return "bg-yellow-300";
    else {
        return "";
    }
};
const debounce = (func, delay) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};
export const printEvents = () => {
    //pendiente:
    //gestionar bien formato fechas,
    //crear div para contener cada evento con su texto y bolita,
    // cambiar color bolita segun tipo evento, cambiar color gris si el evento esta pasado.
    // scroll y scale en recuadro del mes (funcion printMonth)
    const events = getEventsFromLS();
    events.forEach((event) => {
        const { initialDate, endDate, eventype, description, time, title, id } = event;
        const circleColor = getCircleColor(eventype);
        if (initialDate === endDate || endDate === '') {
            const initialDateString = `${new Date(initialDate).getMonth() + 1}-${new Date(initialDate).getDate()}-${new Date(initialDate).getFullYear()}`;
            const ulHtml = document.getElementById(`day-${initialDateString}`);
            if (!ulHtml)
                return;
            const newLi = document.createElement("li");
            newLi.classList.add("px-1", "rounded-sm", "mb-1");
            newLi.setAttribute("event-id", id.toString());
            const circleDiv = document.createElement("div");
            circleDiv.classList.add("rounded-full", "inline-block", "w-2", "h-2", "mr-1");
            if (circleColor) {
                circleDiv.classList.add(circleColor);
            }
            const newSpan = document.createElement("span");
            const hour = (new Date(initialDate).getHours()).toString().length < 2 ? '0' + new Date(initialDate).getHours() : new Date(initialDate).getHours();
            const minute = (new Date(initialDate).getMinutes()).toString().length < 2 ? '0' + new Date(initialDate).getMinutes() : new Date(initialDate).getMinutes();
            newSpan.textContent = `${hour}:${minute} ${title}`;
            newLi.appendChild(circleDiv);
            newLi.appendChild(newSpan);
            if (new Date(initialDate).getTime() - Date.now() < 0)
                newLi.classList.add("line-through", "text-gray-400", 'truncate');
            newLi.addEventListener("click", () => {
                const eventId = newLi.getAttribute("event-id");
                showInfoModal(eventId);
            });
            newLi.addEventListener("mouseenter", debounce((event) => {
                const eventId = newLi.getAttribute("event-id");
                showInfoModalHover(eventId, event);
            }, 200)); // Adjust the delay as needed
            newLi.addEventListener("mouseleave", debounce(() => {
                closeModalHover();
            }, 200)); // Adjust the delay as needed
            ulHtml.appendChild(newLi);
        }
        if (initialDate !== endDate && endDate !== '') {
            const listOfDays = getListOfDaysBetweenTwoDates(initialDate, endDate);
            listOfDays.forEach((day) => {
                const ulHtml = document.getElementById(`day-${day}`);
                if (!ulHtml)
                    return;
                const newLi = document.createElement("li");
                newLi.classList.add("px-1", "rounded-sm", "mb-1");
                newLi.setAttribute("event-id", id.toString());
                const circleDiv = document.createElement("div");
                circleDiv.classList.add("rounded-full", "inline-block", "w-2", "h-2", "mr-1", circleColor);
                const newSpan = document.createElement("span");
                const hour = (new Date(initialDate).getHours()).toString().length < 2 ? '0' + new Date(initialDate).getHours() : new Date(initialDate).getHours();
                const minute = (new Date(initialDate).getMinutes()).toString().length < 2 ? '0' + new Date(initialDate).getMinutes() : new Date(initialDate).getMinutes();
                newSpan.textContent = `${hour}:${minute} ${title}`;
                newLi.appendChild(circleDiv);
                newLi.appendChild(newSpan);
                if (new Date(endDate).getTime() - Date.now() < 0)
                    newLi.classList.add("line-through", "text-gray-400", 'truncate');
                newLi.addEventListener("click", () => {
                    const eventId = newLi.getAttribute("event-id");
                    showInfoModal(eventId);
                });
                newLi.addEventListener("mouseenter", debounce((event) => {
                    const eventId = newLi.getAttribute("event-id");
                    showInfoModalHover(eventId, event);
                }, 200)); // Adjust the delay as needed
                newLi.addEventListener("mouseleave", debounce(() => {
                    closeModalHover();
                }, 200)); // Adjust the delay as needed
                ulHtml.appendChild(newLi);
            });
        }
    });
};
