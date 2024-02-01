import * as type from "../interfaces/exportModule.js";
import { elements } from "../globalElements.js";
import { formatToReadableDate, formatToReadableTime } from "../globalFunctions.js";

export function closeModalHover(): void {
  const { hoverModal } = elements;

  hoverModal.classList.add("hidden");
};

export function showInfoModalHover(id: string, eventE: MouseEvent): void {
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
        paintHoverModal(
          event.title,
          event.initialDate,
          event.endDate,
          eventE
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

function paintHoverModal(infoModalTitleValue: string, infoInitialDateValue: string, infoEndDate: string, eventE?: MouseEvent): void {
  const { hoverModal, hoverModalTitle, hoverModalInitialDate } = elements;
  const posY = eventE?.pageY!;
  const posX = eventE?.pageX!;
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

  if(!infoEndDate) {
    hoverModalInitialDate.textContent = formatToReadableDate(new Date(infoInitialDateValue)) + ' ' + formatToReadableTime(new Date(infoInitialDateValue));
  } else if (formatToReadableDate(new Date(infoInitialDateValue)) === formatToReadableDate(new Date(infoEndDate))) {
    hoverModalInitialDate.textContent = formatToReadableDate(new Date(infoInitialDateValue)) + ' ' + formatToReadableTime(new Date(infoInitialDateValue)) + ' - ' + formatToReadableTime(new Date(infoEndDate));
  } else {
    hoverModalInitialDate.textContent = formatToReadableDate(new Date(infoInitialDateValue)) + ' ' + formatToReadableTime(new Date(infoInitialDateValue)) + ' - ' + formatToReadableDate(new Date(infoEndDate)) + ' ' + formatToReadableTime(new Date(infoEndDate));
  }
};
