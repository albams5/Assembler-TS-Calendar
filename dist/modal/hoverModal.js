import { elements } from "../globalElements.js";
import { formatToReadableDate, formatToReadableTime } from "../globalFunctions.js";
export function closeModalHover() {
    const { hoverModal } = elements;
    hoverModal.classList.add("hidden");
}
;
export function showInfoModalHover(id, eventE) {
    // Retrieve JSON data from local storage
    const storedData = localStorage.getItem("calendar");
    if (storedData) {
        try {
            const jsonData = JSON.parse(storedData);
            // Find the event with the provided id in the eventList
            const event = jsonData.eventList.find((event) => event.id.toString() === id);
            if (event) {
                // If the event is found, log its details
                // Call paintDom() or perform other actions as needed
                paintHoverModal(event.title, event.initialDate, event.endDate, eventE);
            }
            else {
                // If the event is not found, log an error or handle accordingly
                console.error("Event not found with id:", id);
            }
        }
        catch (error) {
            console.error("Error parsing JSON data from local storage:", error);
        }
    }
    else {
        // If no data is found in local storage, log an error or handle accordingly
        console.error("No data found in local storage with key 'calendar'");
    }
}
;
function paintHoverModal(infoModalTitleValue, infoInitialDateValue, infoEndDate, eventE) {
    const { hoverModal, hoverModalTitle, hoverModalInitialDate } = elements;
    const posY = eventE === null || eventE === void 0 ? void 0 : eventE.pageY;
    const posX = eventE === null || eventE === void 0 ? void 0 : eventE.pageX;
    const screenWidth = window.screen.width / 2;
    const screenHeight = window.screen.height / 2;
    hoverModal.style.left = `${posX}px`;
    hoverModal.style.top = `${posY}px`;
    if (posY > screenHeight) {
        hoverModal.style.transform = `translateY(-100%)`;
    }
    if (posX > screenWidth) {
        hoverModal.style.transform = `translateX(-100%)`;
    }
    hoverModal.classList.remove("hidden");
    hoverModalTitle.textContent = infoModalTitleValue;
    if (!infoEndDate) {
        hoverModalInitialDate.textContent = formatToReadableDate(new Date(infoInitialDateValue)) + ' ' + formatToReadableTime(new Date(infoInitialDateValue));
    }
    else if (formatToReadableDate(new Date(infoInitialDateValue)) === formatToReadableDate(new Date(infoEndDate))) {
        hoverModalInitialDate.textContent = formatToReadableDate(new Date(infoInitialDateValue)) + ' ' + formatToReadableTime(new Date(infoInitialDateValue)) + ' - ' + formatToReadableTime(new Date(infoEndDate));
    }
    else {
        hoverModalInitialDate.textContent = formatToReadableDate(new Date(infoInitialDateValue)) + ' ' + formatToReadableTime(new Date(infoInitialDateValue)) + ' - ' + formatToReadableDate(new Date(infoEndDate)) + ' ' + formatToReadableTime(new Date(infoEndDate));
    }
}
;
