import { printMonth } from "./calendar.js";
import { closeModal } from "./closemodal.js";
import { FormData } from "./interfaces/modalData.js";
import { formatToReadableDate, formatToReadableTime } from './helper.js';

export const showInfoModal = (id: string) => {
  // Retrieve JSON data from local storage
  const storedData = localStorage.getItem("calendar");

  if (storedData) {
    try {
      const jsonData = JSON.parse(storedData);

      // Find the event with the provided id in the eventList
      const event = jsonData.eventList.find(
        (event: FormData) => event.id.toString() === id
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

function deleteEventById(id: number) {
  // Retrieve JSON from localStorage
  const storedData = localStorage.getItem("calendar");

  if (storedData) {
    // Parse the JSON
    const calendarData = JSON.parse(storedData);
    const currentMonth = calendarData.currentMonth;

    // Find the index of the event with the given id
    const indexToDelete = calendarData.eventList.findIndex(
      (event: FormData) => event.id === id
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

const paintDom = (
  infoModalTitleValue: string,
  infoInitialDateValue: string,
  infoModalEndDateValue: string,
  infoModalTimeValue: string,
  infoModalDescriptionValue: string,
  infoModalEventTypeValue: string,
  idValue: number
) => {
  const modal = document.getElementById("infoModal")!;
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  const infoModalTitle = document.getElementById("infoModalTitle")!;
  const infoModalInitialDate = document.getElementById("infoModalInitialDate")!;
  const infoModalEndDate = document.getElementById("infoModalEndDate")!;
  const infoModalTime = document.getElementById("infoModalTime")!;
  const infoModalDescription = document.getElementById("infoModalDescription")!;
  const infoModalEventType = document.getElementById("infoModalEventType")!;

  if( !infoModalEndDateValue ) {infoModalEndDate.parentElement?.classList.add('hidden')} else {infoModalEndDate.parentElement?.classList.remove('hidden')}
  if( !infoModalTimeValue ) {infoModalTime.parentElement?.classList.add('hidden')} else{ infoModalTime.parentElement?.classList.remove('hidden')}
  if( !infoModalDescriptionValue ) {infoModalDescription.parentElement?.classList.add('hidden')} else{infoModalDescription.parentElement?.classList.remove('hidden')}
  

  infoModalTitle.textContent = infoModalTitleValue;
  infoModalInitialDate.textContent = formatToReadableDate(new Date(infoInitialDateValue)) + ' ' + formatToReadableTime( new Date(infoInitialDateValue));
  infoModalEndDate.textContent = formatToReadableDate( new Date(infoModalEndDateValue)) + ' ' + formatToReadableTime( new Date(infoModalEndDateValue));
  infoModalTime.textContent = infoModalTimeValue + ' min';
  infoModalDescription.textContent = infoModalDescriptionValue;
  infoModalEventType.textContent = infoModalEventTypeValue;

  const deleteButton = document.getElementById("deleteButton")!;
  deleteButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Call the function to delete the element from local storage
    deleteEventById(idValue);

    // Hide the modal or perform other actions as needed
    const modal = document.getElementById("infoModal");
    if (modal) {
      modal.classList.add("hidden");
    }
  });

  //press key scape to close modal:
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
      modal.classList.add("hidden");
    }
  });
  //press out modal to close it
  function closeModalOut(event: MouseEvent) {
      if (event.target == modal) {
      modal.classList.add("hidden");
      }
  }
  window.addEventListener('click', closeModalOut);
  const btnCancel = document.getElementById('cancelModalButton');
  btnCancel === null || btnCancel === void 0 ? void 0 : btnCancel.addEventListener("click", (event) => {
      event === null || event === void 0 ? void 0 : event.preventDefault();
      modal.classList.add("hidden");
  });

  const closeInfoModalButton = document.getElementById("closeInfoModalButton");
  closeInfoModalButton?.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
      modal.classList.add("hidden");
  });
};
