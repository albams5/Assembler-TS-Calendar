import { showInfoModal } from "../modal/infoModal.js";
import { showInfoModalHover, closeModalHover } from "../modal/hoverModal.js";
import { getEventsFromLS, formatToReadableDate, formatToReadableTime } from "../globalFunctions.js";
function getListOfDaysBetweenTwoDates(startDate, endDate) {
    const firstDate = new Date(startDate);
    const secondDate = new Date(endDate);
    const listOfDays = [];
    for (let date = firstDate; date <= secondDate; date.setDate(date.getDate() + 1)) {
        listOfDays.push(`${new Date(date).getMonth() + 1}-${new Date(date).getDate()}-${new Date(date).getFullYear()}`);
    }
    return listOfDays;
}
function getCircleColor(eventType) {
    if (eventType === "Meeting") {
        return "bg-lime-300";
    }
    else if (eventType === "Personal") {
        return "bg-red-300";
    }
    else if (eventType === "Study") {
        return "bg-blue-300";
    }
    else if (eventType === "Other") {
        return "bg-yellow-300";
    }
    else {
        return "";
    }
}
function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
;
export function printEvents() {
    const events = getEventsFromLS();
    events.forEach((event) => {
        const { initialDate, endDate, eventType, title, id } = event;
        const circleColor = getCircleColor(eventType);
        if (initialDate === endDate || endDate === '') {
            const initialDateString = `${new Date(initialDate).getMonth() + 1}-${new Date(initialDate).getDate()}-${new Date(initialDate).getFullYear()}`;
            const ulHtml = document.getElementById(`day-${initialDateString}`);
            if (!ulHtml) {
                return;
            }
            const newLi = document.createElement("li");
            newLi.classList.add("px-1", "rounded-sm", "mb-1", "truncate");
            newLi.setAttribute("event-id", id.toString());
            const circleDiv = document.createElement("div");
            circleDiv.classList.add("rounded-full", "inline-block", "w-2", "h-2", "mr-1");
            if (circleColor) {
                circleDiv.classList.add(circleColor);
            }
            const newSpan = document.createElement("span");
            const hour = formatToReadableTime(new Date(initialDate));
            newSpan.textContent = `${hour} ${title}`;
            newLi.appendChild(circleDiv);
            newLi.appendChild(newSpan);
            if (new Date(initialDate).getTime() - Date.now() < 0) {
                newLi.classList.add("line-through", "text-gray-400", "truncate");
            }
            newLi.addEventListener("click", () => {
                const eventId = newLi.getAttribute("event-id");
                showInfoModal(eventId);
            });
            newLi.addEventListener("mouseenter", debounce((event) => {
                const eventId = newLi.getAttribute("event-id");
                showInfoModalHover(eventId, event);
            }, 200));
            newLi.addEventListener("mouseleave", debounce(() => {
                closeModalHover();
            }, 200));
            ulHtml.appendChild(newLi);
        }
        if (initialDate !== endDate && endDate !== '') {
            const listOfDays = getListOfDaysBetweenTwoDates(initialDate, endDate);
            listOfDays.forEach((day, i) => {
                const ulHtml = document.getElementById(`day-${day}`);
                if (!ulHtml) {
                    return;
                }
                const newLi = document.createElement("li");
                newLi.classList.add("px-1", "rounded-sm", "mb-1", "truncate");
                newLi.setAttribute("event-id", id.toString());
                const circleDiv = document.createElement("div");
                circleDiv.classList.add("rounded-full", "inline-block", "w-2", "h-2", "mr-1", circleColor);
                const newSpan = document.createElement("span");
                if (formatToReadableDate(new Date(initialDate)) != formatToReadableDate(new Date(endDate)) && i != 0) {
                    newSpan.textContent = `${title}`;
                }
                else {
                    const hour = formatToReadableTime(new Date(initialDate));
                    newSpan.textContent = `${hour} ${title}`;
                }
                newLi.appendChild(circleDiv);
                newLi.appendChild(newSpan);
                if (new Date(endDate).getTime() - Date.now() < 0) {
                    newLi.classList.add("line-through", "text-gray-400", "truncate");
                }
                newLi.addEventListener("click", () => {
                    const eventId = newLi.getAttribute("event-id");
                    showInfoModal(eventId);
                });
                newLi.addEventListener("mouseenter", debounce((event) => {
                    const eventId = newLi.getAttribute("event-id");
                    showInfoModalHover(eventId, event);
                }, 200));
                newLi.addEventListener("mouseleave", debounce(() => {
                    closeModalHover();
                }, 200));
                ulHtml.appendChild(newLi);
            });
        }
    });
}
;
