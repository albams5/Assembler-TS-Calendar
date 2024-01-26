"use strict";
const paintDom = () => {
    console.log("hola dom piant");
    const modal = document.getElementById("modal");
    modal.classList.remove("hidden");
};
const showTitleError = (valueLength) => {
    const modalTitleError = document.getElementById("modalTitleError");
    if (valueLength > 5) {
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
        return false; // Return false to indicate validation failure
    }
    else {
        modalInitialDateError.classList.add("hidden");
        return true; // Return true to indicate validation success
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
document.addEventListener("DOMContentLoaded", () => {
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
    //clear title errors when input is been writen:
    modalTitle.addEventListener("input", () => hideTitleError());
    modalTitle.addEventListener("input", () => hideTitleFillError());
    //modal endate show/hide with checkbox:
    const modalEndateCheck = document.getElementById("modalEndateCheck");
    modalEndateCheck.addEventListener("change", () => showRemoveEndate());
    //validate the form is filled:
    const form = document.getElementById("myForm");
    form.addEventListener("submit", function (event) {
        if (!validateTitleFill()) {
            event.preventDefault(); // Prevent the form from being submitted
        }
        else if (!validateInitialDateFill()) {
            event.preventDefault(); // Prevent the form from being submitted
        }
    });
    //close modal with x button:
    const closeModalButton = document.getElementById("closeModalButton");
    closeModalButton.addEventListener("click", () => closeModal());
    //clear inital date errors when input is been writen:
    const modalInitialDate = document.getElementById("modalInitialDate");
    modalInitialDate.addEventListener("input", () => hideInitialDateError());
});
