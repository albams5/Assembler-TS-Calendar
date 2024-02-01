import { elements } from '../globalElements.js';
import { hideTitleError, hideTitleFillError, hideInitialDateError } from './modal.js';
export function closeModal() {
    const { modal } = elements;
    clearModalContent();
    clearErrorMessages();
    modal === null || modal === void 0 ? void 0 : modal.classList.add("hidden");
}
function clearModalContent() {
    const { modalTitle, modalInitialDate, modalTimeLabel, modalTimeCheck, modalEndDateContainer, modalEndDateCheck, modalEndDateInput, modalComment, modalTimeSelect, modalEvent } = elements;
    modalTitle.value = "";
    modalInitialDate.value = "";
    modalEndDateInput.value = "";
    modalComment.value = "";
    modalTimeSelect.value = "5";
    modalEvent.value = "Meeting";
    modalEndDateCheck.checked = false;
    modalEndDateContainer.classList.add("hidden");
    modalTimeCheck.checked = false;
    modalTimeLabel.classList.add("hidden");
}
function clearErrorMessages() {
    hideTitleError();
    hideTitleFillError();
    hideInitialDateError();
}
