"use strict";
//close modal with x button:
// const closeModalButton = document.getElementById("closeModalButton")!;
// closeModalButton.addEventListener("click", () => closeModal());
function closeModal() {
    const modal = document.getElementById("modal");
    modal === null || modal === void 0 ? void 0 : modal.classList.add("hidden");
}
function clearModalContent() {
    const modalTitle = document.getElementById("modalTitle");
    const modalInitialDate = document.getElementById("modalInitialDate");
    const modalEndate = document.getElementById("modalEndate");
    const comment = document.getElementById("comment");
    const modalTime = document.getElementById("TimeInput");
    const modalEvent = document.getElementById("modalEvent");
    modalTitle.textContent = "";
    modalInitialDate.textContent = "";
    modalEndate.textContent = "";
    comment.textContent = "";
    modalTime.textContent = "";
    modalEvent.textContent = "";
}
document.addEventListener("DOMContentLoaded", () => {
    const closeModalButton = document.getElementById("closeModalButton");
    closeModalButton.addEventListener("click", () => {
        closeModal();
        clearModalContent();
    });
});
const modalTitle = document.getElementById("modalTitle");
const modalInitialDate = document.getElementById("modalInitialDate");
const modalEndate = document.getElementById("modalEndate");
const comment = document.getElementById("comment");
const modalTime = document.getElementById("TimeInput");
const modalEvent = document.getElementById("modalEvent");
