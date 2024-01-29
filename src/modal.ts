import { Calendar, FormData } from "./modalData";

const paintDom = () => {
  const modal = document.getElementById("modal")!;

  modal.classList.remove("hidden");
};

const showTitleError = (valueLength: number) => {
  const modalTitleError = document.getElementById("modalTitleError")!;
  if (valueLength > 5) {
    console.log("modal title to long");
    modalTitleError.classList.remove("hidden");
  }
};

const hideTitleError = () => {
  const modalTitleError = document.getElementById("modalTitleError")!;
  modalTitleError.classList.add("hidden");
};

const hideTitleFillError = () => {
  const modalTitleError = document.getElementById("modalTitleErrorFill")!;
  modalTitleError.classList.add("hidden");
};

const showRemoveEndate = () => {
  const modalEndateCheck = document.getElementById("modalEndateCheck") as HTMLInputElement;
  const modalEndate = document.getElementById("modalEndate")!;
  const modalEndateLabel = document.getElementById("modalEndateLabel")!;

  if (modalEndateCheck.checked) {
    modalEndate.classList.remove("hidden");
    modalEndateLabel.classList.remove("hidden");
  } else {
    modalEndate.classList.add("hidden");
    modalEndateLabel.classList.add("hidden");
  }
};

const showRemoveTime = () => {
  const timeInput = document.getElementById("TimeInput") as HTMLInputElement;
  const modalTimeLabel = document.getElementById("modalTimeLabel") as HTMLLabelElement;
  const modalTimeCheck = document.getElementById("modalTimeCheck") as HTMLInputElement;
  console.log("modalTimeCheck", modalTimeCheck.checked); 
  if (modalTimeCheck.checked) {
    timeInput.classList.remove("hidden");
    modalTimeLabel.classList.remove("hidden");
  } else {
    timeInput.classList.add("hidden");
    modalTimeLabel.classList.add("hidden");
  }
};


const validateTitleFill = () => {
  const modalTitle = document.getElementById("modalTitle") as HTMLInputElement;
  const modalTitleErrorFill = document.getElementById(
    "modalTitleErrorFill"
  ) as HTMLInputElement;

  if (modalTitle.value.trim() === "") {
    modalTitleErrorFill.classList.remove("hidden");
    return false; // Return false to indicate validation failure
  } else {
    modalTitleErrorFill.classList.add("hidden");
    return true; // Return true to indicate validation success
  }
};

const validateInitialDateFill = () => {
  const modalInitialDate = document.getElementById(
    "modalInitialDate"
  ) as HTMLInputElement;
  const modalInitialDateError = document.getElementById(
    "modalInitialDateError"
  ) as HTMLInputElement;

  if (modalInitialDate.value.trim() === "") {
    modalInitialDateError.classList.remove("hidden");
    return false;
  } else {
    modalInitialDateError.classList.add("hidden");
    return true;
  }
};

const hideInitialDateError = () => {
  const modalInitialDateError = document.getElementById(
    "modalInitialDateError"
  )!;
  modalInitialDateError.classList.add("hidden");
};

const validateEventFill = () => {
  const modalEvent = document.getElementById(
    "modalEvent"
  ) as HTMLInputElement;
  const modalEventError = document.getElementById(
    "modalEventError"
  ) as HTMLInputElement;

  if (modalEvent.value.trim() === "") {
    modalEventError.classList.remove("hidden");
    return false; 
  } else {
    modalEventError.classList.add("hidden");
    return true;
  }
};

const hideEventError = () => {
  const modalEventError = document.getElementById(
    "modalEventError"
  )!;
  modalEventError.classList.add("hidden");
};

const closeModal = () => {
  const modal = document.getElementById("modal")!;
  modal.classList.add("hidden");
};

const handleFormSub = (event: Event) => {
  event.preventDefault();

  const modalTitle = document.getElementById("modalTitle") as HTMLInputElement;
  const modalInitialDate = document.getElementById(
    "modalInitialDate"
  ) as HTMLInputElement;
  const modalEndate = document.getElementById(
    "modalEndate"
  ) as HTMLInputElement;
  const comment = document.getElementById("comment") as HTMLTextAreaElement;
  const modalTime = document.getElementById("TimeInput") as HTMLInputElement;
  const modalEvent = document.getElementById("drawfemailss") as HTMLInputElement;
  const modalTitleValue = modalTitle.value;
  const modalInitialDateValue = modalInitialDate.value;
  const modalEndateValue = modalEndate.value;
  const modalTimeValue = modalTime.value;
  const commentValue = comment.value;
  const modalEventValue = modalEvent.value;

  const eventsArray: FormData[] = [
    {
      title: modalTitleValue,
      initialDate: modalInitialDateValue,
      endDate: modalEndateValue,
      time: modalTimeValue,
      description: commentValue,
      eventype: modalEventValue,
    },
  ];
  const formData: Calendar = {
    eventList: eventsArray,
    currentMonth: 1,
  };


  const formDataJSON = JSON.stringify(formData);
  localStorage.setItem("formData", formDataJSON);
  console.log("Form submitted successfully!: ", formDataJSON);
  closeModal();
};

document.addEventListener("DOMContentLoaded", () => {
  const testDiv = document.getElementById("testDiv")!;
  const test = document.createElement("p")!;

  const formDataJSON = localStorage.getItem("formData");
  if (formDataJSON) {
    const formData = JSON.parse(formDataJSON);
    console.log("localStorage content on page load:", formData);
    test.textContent = `VIEJO: titulo: ${formData.title}, Initial date: ${formData.initialDate}, Endate: ${formData.endate}, Time: ${formData.time}, description: ${formData.description}, Event: ${formData.eventype} `;
  }

  testDiv.appendChild(test);

  const modal = document.getElementById("modal")!;

  const modalButton = document.getElementById("domButton")!;
  modalButton.addEventListener("click", paintDom);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
      modal.classList.add("hidden");
    }
  });
  const modalTitle = document.getElementById("modalTitle") as HTMLInputElement;
  modalTitle.addEventListener("blur", () =>
    showTitleError(modalTitle.value.length)
  );
  
  modalTitle.addEventListener("input", () => hideTitleError());
  modalTitle.addEventListener("input", () => hideTitleFillError());

  const modalEndateCheck = document.getElementById(
    "modalEndateCheck"
  ) as HTMLInputElement;
  modalEndateCheck.addEventListener("change", () => showRemoveEndate());
  
  const modalTimeCheck = document.getElementById(
    "modalTimeCheck"
  ) as HTMLInputElement;
  modalTimeCheck.addEventListener("change", () => showRemoveTime());
  
  

  const form = document.getElementById("myForm")!;
  form.addEventListener("submit", function (event) {
    if (!validateTitleFill() || !validateInitialDateFill() || validateEventFill()) {
      event.preventDefault(); // Prevent the form from being submitted if validation fails
    } else {
      handleFormSub(event);
    }
  });


  const closeModalButton = document.getElementById("closeModalButton")!;
  closeModalButton.addEventListener("click", () => closeModal());

  const modalInitialDate = document.getElementById(
    "modalInitialDate"
  ) as HTMLInputElement;
  modalInitialDate.addEventListener("input", () => hideInitialDateError());

  const modalEvent = document.getElementById(
    "modalEvent"
  ) as HTMLInputElement;
  modalEvent.addEventListener("input", () => hideEventError());
});
