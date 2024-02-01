import * as type from "../interfaces/exportModule.js";
import { printMonth } from "../calendar/calendar.js";
import { formatToReadableDate, formatToReadableTime } from "../globalFunctions.js";
import { elements } from "../globalElements.js";

export function showInfoModal(id: string): void {
  // Retrieve JSON data from local storage
  const storedData = localStorage.getItem("calendar");

  if (storedData) {
    try {
      const jsonData = JSON.parse(storedData);

      // Find the event with the provided id in the eventList
      const event = jsonData.eventList.find(
        (event: type.Event) => event.id.toString() === id
      );

      if (event) {
        // If the event is found, log its details
        // Call paintDom() or perform other actions as needed
        paintDom(
          event.title,
          event.initialDate,
          event.endDate,
          event.alertTime,
          event.description,
          event.eventType,
          event.id
        );
      } else {
        // If the event is not found, log an error or handle accordingly
        console.error("Event not found with id:", id);
      }
    } catch (error) {
      console.error("Error parsing JSON data from local storage:", error);
    }
  } else {
    // If no data is found in local storage, log an error or handle accordingly
    console.error("No data found in local storage with key 'calendar'");
  }
};

function deleteEventById(id: number): void {
  // Retrieve JSON from localStorage
  const storedData = localStorage.getItem("calendar");

  if (storedData) {
    // Parse the JSON
    const calendarData = JSON.parse(storedData);
    const currentMonth = calendarData.currentMonth;

    // Find the index of the event with the given id
    const indexToDelete = calendarData.eventList.findIndex(
      (event: type.Event) => event.id === id
    );

    // If the event is found, remove it from the array
    if (indexToDelete !== -1) {
      calendarData.eventList.splice(indexToDelete, 1);

      // Save the updated JSON back to localStorage
      localStorage.setItem("calendar", JSON.stringify(calendarData));
      printMonth(currentMonth.year, currentMonth.id);
    } else {
      console.log(`Event with id ${id} not found.`);
    }
  } else {
    console.log("No calendar data found in localStorage.");
  }
}

// Example usage: deleteEventById(1706611594279);

function paintDom(infoModalTitleValue: string, infoInitialDateValue: string, infoModalEndDateValue: string, infoModalTimeValue: string, infoModalDescriptionValue: string, infoModalEventTypeValue: string, idValue: number): void {
  const { modalInfo, modalInfoTitle, modalInfoInitialDate, modalInfoEndDate, modalInfoTime, modalInfoDescription, modalInfoEvent, modalInfoBtnDelete, modalInfoBtnClose } = elements;
  
  modalInfo.classList.remove("hidden");
  modalInfo.classList.add("flex");

  if( !infoModalEndDateValue ) {modalInfoEndDate.parentElement?.classList.add('hidden')} else {modalInfoEndDate.parentElement?.classList.remove('hidden')}
  if( !infoModalTimeValue ) {modalInfoTime.parentElement?.classList.add('hidden')} else{ modalInfoTime.parentElement?.classList.remove('hidden')}
  if( !infoModalDescriptionValue ) {modalInfoDescription.parentElement?.classList.add('hidden')} else{modalInfoDescription.parentElement?.classList.remove('hidden')}
  
  modalInfoTitle.textContent = infoModalTitleValue;
  modalInfoInitialDate.textContent = formatToReadableDate(new Date(infoInitialDateValue)) + ' ' + formatToReadableTime( new Date(infoInitialDateValue));
  modalInfoEndDate.textContent = formatToReadableDate( new Date(infoModalEndDateValue)) + ' ' + formatToReadableTime( new Date(infoModalEndDateValue));
  modalInfoTime.textContent = infoModalTimeValue + ' min';
  modalInfoDescription.textContent = infoModalDescriptionValue;
  modalInfoEvent.textContent = infoModalEventTypeValue;

  modalInfoBtnDelete.addEventListener("click", function (event) {
    event.preventDefault();

    // Call the function to delete the element from local storage
    deleteEventById(idValue);

    // Hide the modal or perform other actions as needed
    if (modalInfo) {
      modalInfo.classList.add("hidden");
    }
  });

  //press key scape to close modal:
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
      modalInfo.classList.add("hidden");
    }
  });
  //press out modal to close it
  function closeModalOut(event: MouseEvent) {
      if (event.target == modalInfo) {
        modalInfo.classList.add("hidden");
      }
  }
  window.addEventListener('click', closeModalOut);

  modalInfoBtnClose.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
      modalInfo.classList.add("hidden");
  });
};
