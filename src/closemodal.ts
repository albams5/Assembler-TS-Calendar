//close modal with x button:
  // const closeModalButton = document.getElementById("closeModalButton")!;
  // closeModalButton.addEventListener("click", () => closeModal());

function closeModal() {
    const modal: HTMLElement | null = document.getElementById("modal");
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
    modalTitle.textContent = "";
    modalInitialDate.textContent = "";
    modalEndate.textContent = "";
    comment.textContent = "";
    modalTime.textContent = "";
    modalEvent.textContent = "";
    }


    document.addEventListener("DOMContentLoaded", () => {
        const closeModalButton = document.getElementById("closeModalButton")!;
        closeModalButton.addEventListener("click", () => {
            closeModal();
            clearModalContent();
        });
    });












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