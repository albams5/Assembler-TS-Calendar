const paintDom = () => {
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
const handleFormSub = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const modalTitle = document.getElementById("modalTitle");
    const modalInitialDate = document.getElementById("modalInitialDate");
    const modalEndate = document.getElementById("modalEndate");
    const modalTitleValue = modalTitle.value;
    const modalInitialDateValue = modalInitialDate.value;
    const modalEndateValue = modalEndate.value;
    const eventsArray = [
        {
            title: modalTitleValue,
            initialDate: modalInitialDateValue,
            endDate: modalEndateValue,
            time: null,
            description: null,
            eventype: null,
        },
    ];
    const formData = {
        eventList: eventsArray,
        currentMonth: 1,
    };
    // Convert the object to a JSON string
    const formDataJSON = JSON.stringify(formData);
    // Save the JSON string to localStorage
    localStorage.setItem("formData", formDataJSON);
    // Optionally, you can display a success message or redirect the user
    console.log("Form submitted successfully!: ", formDataJSON);
    // Close the modal if needed
    closeModal();
};
document.addEventListener("DOMContentLoaded", () => {
    // Show localStorage content at the beginning
    const testDiv = document.getElementById("testDiv");
    const test = document.createElement("p");
    const formDataJSON = localStorage.getItem("formData");
    if (formDataJSON) {
        const formData = JSON.parse(formDataJSON);
        console.log("localStorage content on page load:", formData);
        test.textContent = `VIEJO: titulo: ${formData.title}, Initial date: ${formData.initialDate}, Endate: ${formData.endate} `;
    }
    testDiv.appendChild(test);
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
    //clear inital date errors when input is been writen:
    const modalInitialDate = document.getElementById("modalInitialDate");
    modalInitialDate.addEventListener("input", () => hideInitialDateError());
});
export {};
