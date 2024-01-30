export const closeModalHover = () => {
    const modal = document.getElementById("infoModalHover");
    modal.classList.add("hidden");
};
export const showInfoModalHover = (id, eventE) => {
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
                paintDom(event.title, event.initialDate, event.endDate, event.time, event.description, event.eventType, event.id, eventE);
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
const paintDom = (infoModalTitleValue, infoInitialDateValue, infoModalEndDateValue, infoModalTimeValue, infoModalDescriptionValue, infoModalEventTypeValue, idValue, eventE) => {
    const modal = document.getElementById("infoModalHover");
    console.log(eventE);
    const posY = eventE === null || eventE === void 0 ? void 0 : eventE.pageY;
    const posX = eventE === null || eventE === void 0 ? void 0 : eventE.pageX;
    const screenWidth = window.screen.width / 2;
    const screenHeight = window.screen.height / 2;
    modal.style.left = `${posX}px`;
    modal.style.top = `${posY}px`;
    if (posY > screenHeight) {
        modal.style.transform = `translateY(-100%)`;
    }
    if (posX > screenWidth) {
        modal.style.transform = `translateX(-100%)`;
    }
    modal.classList.remove("hidden");
    console.log(infoModalTimeValue);
    const infoModalTitle = document.getElementById("infoModalTitleHover");
    const infoModalInitialDate = document.getElementById("infoModalInitialDateHover");
    infoModalTitle.textContent = infoModalTitleValue;
    infoModalInitialDate.textContent = infoInitialDateValue;
    const deleteButton = document.getElementById("deleteButton");
    deleteButton.addEventListener("click", function (event) {
        event.preventDefault();
        const infoModalTitle = document.getElementById("infoModalTitle");
        const idToDelete = infoModalTitle.textContent;
        console.log("idToDeleteNumber:", idValue);
        // Call the function to delete the element from local storage
        // Hide the modal or perform other actions as needed
        const modal = document.getElementById("infoModal");
        if (modal) {
            modal.classList.add("hidden");
        }
    });
};
