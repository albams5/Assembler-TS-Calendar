import { closeModal } from './closemodal.js';
import { printMonth } from './calendar.js';
export const paintDom = () => {
    const modal = document.getElementById("modal");
    setModal();
    modal.classList.remove("hidden");
    modal.classList.add("flex");
};
export const paintDomDay = (e) => {
    const target = e.target;
    const btnDate = target.getAttribute("date") || "";
    const date = new Date(Date.UTC(parseInt(btnDate.split('-')[0]), parseInt(btnDate.split('-')[1]), parseInt(btnDate.split('-')[2])));
    const dateString = date.toJSON().split('.')[0];
    const modal = document.getElementById("modal");
    const modalInitialDate = document.getElementById("modalInitialDate");
    modalInitialDate.value = dateString;
    setModal();
    modal.classList.remove("hidden");
    modal.classList.add("flex");
};
const showTitleError = (valueLength) => {
    const modalTitleError = document.getElementById("modalTitleError");
    if (valueLength > 60) {
        modalTitleError.classList.remove("hidden");
    }
};
export const hideTitleError = () => {
    const modalTitleError = document.getElementById("modalTitleError");
    modalTitleError.classList.add("hidden");
};
export const hideTitleFillError = () => {
    const modalTitleError = document.getElementById("modalTitleErrorFill");
    modalTitleError.classList.add("hidden");
};
const showRemoveEndate = () => {
    const modalEndateCheck = document.getElementById("modalEndateCheck");
    const endDateContainer = document.getElementById("endDateContainer");
    if (modalEndateCheck.checked) {
        endDateContainer.classList.remove("hidden");
    }
    else {
        endDateContainer.classList.add("hidden");
    }
};
const showRemoveTime = () => {
    const timeInput = document.getElementById("TimeInput");
    const modalTimeLabel = document.getElementById("modalTimeLabel");
    const modalTimeCheck = document.getElementById("modalTimeCheck");
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
export const hideInitialDateError = () => {
    const modalInitialDateError = document.getElementById("modalInitialDateError");
    modalInitialDateError.classList.add("hidden");
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
    const currentMonth = JSONcalendar.currentMonth;
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
    printMonth(currentMonth.year, currentMonth.id);
    closeModal();
};
export function setModal() {
    const modal = document.getElementById("modal");
    //press key scape to close modal:
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" || event.key === "Esc") {
            closeModal();
        }
    });
    //press out modal to close it
    function closeModalOut(event) {
        if (event.target == modal) {
            closeModal();
        }
    }
    window.addEventListener('click', closeModalOut);
    const btnCancel = document.getElementById('cancelModalButton');
    btnCancel === null || btnCancel === void 0 ? void 0 : btnCancel.addEventListener("click", (event) => {
        event === null || event === void 0 ? void 0 : event.preventDefault();
        closeModal();
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
    //clear initial date errors when input is been written:
    const modalInitialDate = document.getElementById("modalInitialDate");
    modalInitialDate.addEventListener("input", () => hideInitialDateError());
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
    const closeModalButton = document.getElementById("closeModalButton");
    closeModalButton.addEventListener("click", (event) => {
        event.preventDefault();
        closeModal();
    });
}
