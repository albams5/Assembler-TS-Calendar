import { hideTitleError, hideTitleFillError, hideInitialDateError } from './modal.js';

export function closeModal() {
    const modal: HTMLElement | null = document.getElementById("modal");
    clearModalContent();
    clearErrorMessages();
    modal?.classList.add("hidden");
}

function clearModalContent() {
    const modalTitle = document.getElementById("modalTitle") as HTMLInputElement;
    const modalInitialDate = document.getElementById(
    "modalInitialDate"
    ) as HTMLInputElement;
    const modalEndate = document.getElementById(
    "modalEndate"
    ) as HTMLInputElement;
    const comment = document.getElementById("comment") as HTMLTextAreaElement;
    const modalTime = document.getElementById("TimeInput") as HTMLInputElement;
    const modalEvent = document.getElementById("modalEvent") as HTMLInputElement;
    const checkEndDate = document.getElementById("modalEndateCheck") as HTMLInputElement;
    const containerEndDate = document.getElementById("endDateContainer") as HTMLDivElement;
    const checkTime = document.getElementById("modalTimeCheck") as HTMLInputElement;
    const containerTime = document.getElementById("modalTimeLabel") as HTMLDivElement;
    
    modalTitle.value = "";
    modalInitialDate.value = "";
    modalEndate.value = "";
    comment.value = "";
    modalTime.value = "5";
    modalEvent.value = "Meeting";
    checkEndDate.checked = false;
    containerEndDate.classList.add("hidden");
    checkTime.checked = false;
    containerTime.classList.add("hidden");
}

function clearErrorMessages () {
    hideTitleError();
    hideTitleFillError();
    hideInitialDateError();
}
