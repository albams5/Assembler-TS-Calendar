import { hideTitleError, hideTitleFillError, hideInitialDateError } from './modal.js';

export function closeModal() {
    const modal: HTMLElement | null = document.getElementById("modal");
    clearModalContent();
    clearErrorMessages();
    modal?.classList.add("hidden");
}

function clearModalContent() {
    console.log('hola clean content')
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
    modalTitle.value = "";
    modalInitialDate.value = "";
    modalEndate.value = "";
    comment.value = "";
    modalTime.value = "";
    modalEvent.value = "Meeting";
}

function clearErrorMessages () {
    console.log('hola clean error')
    hideTitleError();
    hideTitleFillError();
    hideInitialDateError();
}
