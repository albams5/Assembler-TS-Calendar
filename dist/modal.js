const paintDom = () => {
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
};
export const paintDomDay = (e) => {
    const target = e.target;
    console.log("🚀 ~ paintDomDay ~ target:", target);
    const btnDate = target.getAttribute("date") || "";
    const date = new Date(Date.UTC(parseInt(btnDate.split('-')[0]), parseInt(btnDate.split('-')[1]), parseInt(btnDate.split('-')[2])));
    const dateString = date.toJSON().split('.')[0];
    const modal = document.getElementById("modal");
    const modalInitialDate = document.getElementById("modalInitialDate");
    modalInitialDate.value = dateString;
    modal.classList.remove("hidden");
};
const showTitleError = (valueLength) => {
    const modalTitleError = document.getElementById("modalTitleError");
    if (valueLength > 60) {
        console.log("modal title to long");
        modalTitleError.classList.remove("hidden");
    }
};
const hideTitleError = () => {
    const modalTitleError = document.getElementById("modalTitleError");
    modalTitleError.classList.add("hidden");
};
const hideTitleFillError = () => {
    const modalTitleError = document.getElementById("modalTitleErrorFill");
    modalTitleError.classList.add("hidden");
};
const showRemoveEndate = () => {
    const modalEndateCheck = document.getElementById("modalEndateCheck");
    const modalEndate = document.getElementById("modalEndate");
    const modalEndateLabel = document.getElementById("modalEndateLabel");
    if (modalEndateCheck.checked) {
        modalEndate.classList.remove("hidden");
        modalEndateLabel.classList.remove("hidden");
    }
    else {
        modalEndate.classList.add("hidden");
        modalEndateLabel.classList.add("hidden");
    }
};
const showRemoveTime = () => {
    const timeInput = document.getElementById("TimeInput");
    const modalTimeLabel = document.getElementById("modalTimeLabel");
    const modalTimeCheck = document.getElementById("modalTimeCheck");
    console.log("modalTimeCheck", modalTimeCheck.checked);
    if (modalTimeCheck.checked) {
        timeInput.classList.remove("hidden");
        modalTimeLabel.classList.remove("hidden");
    }
    else {
        timeInput.classList.add("hidden");
        modalTimeLabel.classList.add("hidden");
    }
};
const validateTitleFill = () => {
    const modalTitle = document.getElementById("modalTitle");
    const modalTitleErrorFill = document.getElementById("modalTitleErrorFill");
    if (modalTitle.value.trim() === "") {
        modalTitleErrorFill.classList.remove("hidden");
        return false; // Return false to indicate validation failure
    }
    else {
        modalTitleErrorFill.classList.add("hidden");
        return true; // Return true to indicate validation success
    }
};
const validateInitialDateFill = () => {
    const modalInitialDate = document.getElementById("modalInitialDate");
    const modalInitialDateError = document.getElementById("modalInitialDateError");
    if (modalInitialDate.value.trim() === "") {
        modalInitialDateError.classList.remove("hidden");
        return false;
    }
    else {
        modalInitialDateError.classList.add("hidden");
        return true;
    }
};
const hideInitialDateError = () => {
    const modalInitialDateError = document.getElementById("modalInitialDateError");
    modalInitialDateError.classList.add("hidden");
};
const closeModal = () => {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
};
const handleFormSub = (event) => {
    event.preventDefault();
    const modalTitle = document.getElementById("modalTitle");
    const modalInitialDate = document.getElementById("modalInitialDate");
    const modalEndate = document.getElementById("modalEndate");
    const comment = document.getElementById("comment");
    const modalTime = document.getElementById("TimeInput");
    const modalEvent = document.getElementById("modalEvent");
    const modalTitleValue = modalTitle.value;
    const modalInitialDateValue = modalInitialDate.value;
    const modalEndateValue = modalEndate.value;
    const modalTimeValue = modalTime.value;
    const commentValue = comment.value;
    const modalEventValue = modalEvent.value;
    const calendar = localStorage.getItem("calendar") || "{'eventList':[], 'currentMonth':{}}";
    const JSONcalendar = JSON.parse(calendar);
    let eventArray = JSONcalendar.eventList;
    const newEvent = {
        id: Date.now(),
        title: modalTitleValue,
        initialDate: modalInitialDateValue,
        endDate: modalEndateValue,
        time: modalTimeValue,
        description: commentValue,
        eventype: modalEventValue,
    };
    eventArray.push(newEvent);
    localStorage.setItem("calendar", JSON.stringify(JSONcalendar));
    closeModal();
};
export function setModal() {
    const test = document.createElement("p");
    const formDataJSON = localStorage.getItem("formData");
    if (formDataJSON) {
        const formData = JSON.parse(formDataJSON);
        console.log("localStorage content on page load:", formData);
        test.textContent = `VIEJO: titulo: ${formData.title}, Initial date: ${formData.initialDate}, Endate: ${formData.endate} `;
    }
    const modal = document.getElementById("modal");
    //show modal with header button
    const modalButton = document.getElementById("domButton");
    modalButton.addEventListener("click", paintDom);
    //press key scape to close modal:
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" || event.key === "Esc") {
            modal.classList.add("hidden");
        }
    });
    //modal title error control:
    const modalTitle = document.getElementById("modalTitle");
    modalTitle.addEventListener("blur", () => showTitleError(modalTitle.value.length));
    //clear title errors when input is been written:
    modalTitle.addEventListener("input", () => hideTitleError());
    modalTitle.addEventListener("input", () => hideTitleFillError());
    //modal endate show/hide with checkbox:
    const modalEndateCheck = document.getElementById("modalEndateCheck");
    modalEndateCheck.addEventListener("change", () => showRemoveEndate());
    const showRemoveTimee = document.getElementById("modalTimeCheck");
    showRemoveTimee.addEventListener("change", () => showRemoveTime());
    //validate the form is filled:
    const form = document.getElementById("myForm");
    form.addEventListener("submit", function (event) {
        if (!validateTitleFill() || !validateInitialDateFill()) {
            event.preventDefault(); // Prevent the form from being submitted if validation fails
        }
        else {
            handleFormSub(event);
        }
    });
    //close modal with x button:
    const closeModalButton = document.getElementById("closeModalButton");
    closeModalButton.addEventListener("click", () => closeModal());
    //clear initial date errors when input is been written:
    const modalInitialDate = document.getElementById("modalInitialDate");
    modalInitialDate.addEventListener("input", () => hideInitialDateError());
}
// interface hdhdhd {
//   name: string;
//   reminderTime: number; // Time in minutes before event expiration
// }
// const events: hdhdhd[] = [
//   { name: "Event 1", reminderTime: 60 },
//   { name: "Event 2", reminderTime: 30 },
// ];
// function checkEventReminder() {
//   setInterval(() => {
//     const now = new Date();
//     console.log(now)
//     events.forEach((event) => {
//       const expirationTime = new Date(event.reminderTime);
//       const reminderTime = new Date(expirationTime.getTime() - event.reminderTime * 60000); // Convert minutes to milliseconds
//       if (now >= reminderTime && now < expirationTime) {
//         alert(`${event.name} will expire in ${event.reminderTime} minutes.`);
//       }
//     });
//   }, 10000); // Check every 10 seconds
// }
// checkEventReminder()
