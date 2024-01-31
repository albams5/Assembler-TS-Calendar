import { hideTitleError, hideTitleFillError, hideInitialDateError } from './modal.js';
export function closeModal() {
    const modal = document.getElementById("modal");
    clearModalContent();
    clearErrorMessages();
    modal === null || modal === void 0 ? void 0 : modal.classList.add("hidden");
}
function clearModalContent() {
    const modalTitle = document.getElementById("modalTitle");
    const modalInitialDate = document.getElementById("modalInitialDate");
    const modalEndate = document.getElementById("modalEndate");
    const comment = document.getElementById("comment");
    const modalTime = document.getElementById("TimeInput");
    const modalEvent = document.getElementById("modalEvent");
    const checkEndDate = document.getElementById("modalEndateCheck");
    const containerEndDate = document.getElementById("endDateContainer");
    const checkTime = document.getElementById("modalTimeCheck");
    const containerTime = document.getElementById("modalTimeLabel");
    modalTitle.value = "";
    modalInitialDate.value = "";
    modalEndate.value = "";
    comment.value = "";
    modalTime.value = "5min";
    modalEvent.value = "Meeting";
    checkEndDate.checked = false;
    containerEndDate.classList.add("hidden");
    checkTime.checked = false;
    containerTime.classList.add("hidden");
}
function clearErrorMessages() {
    hideTitleError();
    hideTitleFillError();
    hideInitialDateError();
}
