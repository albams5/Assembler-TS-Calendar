import { hideTitleError, hideTitleFillError, hideInitialDateError } from './modal.js';
export function closeModal() {
    const modal = document.getElementById("modal");
    clearModalContent();
    clearErrorMessages();
    modal === null || modal === void 0 ? void 0 : modal.classList.add("hidden");
}
function clearModalContent() {
    console.log('hola clean content');
    const modalTitle = document.getElementById("modalTitle");
    const modalInitialDate = document.getElementById("modalInitialDate");
    const modalEndate = document.getElementById("modalEndate");
    const comment = document.getElementById("comment");
    const modalTime = document.getElementById("TimeInput");
    const modalEvent = document.getElementById("modalEvent");
    modalTitle.value = "";
    modalInitialDate.value = "";
    modalEndate.value = "";
    comment.value = "";
    modalTime.value = "";
    modalEvent.value = "Meeting";
}
function clearErrorMessages() {
    console.log('hola clean error');
    hideTitleError();
    hideTitleFillError();
    hideInitialDateError();
}
