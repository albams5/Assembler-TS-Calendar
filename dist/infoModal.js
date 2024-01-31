import { printMonth } from "./calendar.js";
export const showInfoModal = (id) => {
    console.log("Clicked event with id:", id);
    // Retrieve JSON data from local storage
    const storedData = localStorage.getItem("calendar");
    if (storedData) {
        try {
            const jsonData = JSON.parse(storedData);
            // Find the event with the provided id in the eventList
            const event = jsonData.eventList.find((event) => event.id.toString() === id);
            if (event) {
                // If the event is found, log its details
                console.log("Title:", event.title);
                console.log("Initial Date:", event.initialDate);
                // Call paintDom() or perform other actions as needed
                paintDom(event.title, event.initialDate, event.endDate, event.time, event.description, event.eventType, event.id);
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
};
function deleteEventById(id) {
    // Retrieve JSON from localStorage
    const storedData = localStorage.getItem("calendar");
    if (storedData) {
        // Parse the JSON
        const calendarData = JSON.parse(storedData);
        const currentMonth = calendarData.currentMonth;
        // Find the index of the event with the given id
        const indexToDelete = calendarData.eventList.findIndex((event) => event.id === id);
        // If the event is found, remove it from the array
        if (indexToDelete !== -1) {
            calendarData.eventList.splice(indexToDelete, 1);
            // Save the updated JSON back to localStorage
            localStorage.setItem("calendar", JSON.stringify(calendarData));
            printMonth(currentMonth.year, currentMonth.id);
            console.log(`Event with id ${id} deleted successfully.`);
        }
        else {
            console.log(`Event with id ${id} not found.`);
        }
    }
    else {
        console.log("No calendar data found in localStorage.");
    }
}
// Example usage: deleteEventById(1706611594279);
const paintDom = (infoModalTitleValue, infoInitialDateValue, infoModalEndDateValue, infoModalTimeValue, infoModalDescriptionValue, infoModalEventTypeValue, idValue) => {
    const modal = document.getElementById("infoModal");
    modal.classList.remove("hidden");
    const infoModalTitle = document.getElementById("infoModalTitle");
    const infoModalInitialDate = document.getElementById("infoModalInitialDate");
    const infoModalEndDate = document.getElementById("infoModalEndDate");
    const infoModalTime = document.getElementById("infoModalTime");
    const infoModalDescription = document.getElementById("infoModalDescription");
    const infoModalEventType = document.getElementById("infoModalEventType");
    infoModalTitle.textContent = infoModalTitleValue;
    infoModalInitialDate.textContent = infoInitialDateValue;
    infoModalEndDate.textContent = infoModalEndDateValue;
    infoModalTime.textContent = infoModalTimeValue;
    infoModalDescription.textContent = infoModalDescriptionValue;
    infoModalEventType.textContent = infoModalEventTypeValue;
    const deleteButton = document.getElementById("deleteButton");
    deleteButton.addEventListener("click", function (event) {
        event.preventDefault();
        const infoModalTitle = document.getElementById("infoModalTitle");
        const idToDelete = infoModalTitle.textContent;
        console.log("idToDeleteNumber:", idValue);
        // Call the function to delete the element from local storage
        deleteEventById(idValue);
        // Hide the modal or perform other actions as needed
        const modal = document.getElementById("infoModal");
        if (modal) {
            modal.classList.add("hidden");
        }
    });
};
