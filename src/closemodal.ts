//close modal with x button:
  // const closeModalButton = document.getElementById("closeModalButton")!;
  // closeModalButton.addEventListener("click", () => closeModal());

function closeModal() {
    const modal: HTMLElement | null = document.getElementById("modal");
    if (modal) {
        modal.style.display = "none";
    }
    }

    function clearModalContent() {
    const modalContent: HTMLElement | null = document.getElementById("modal");
    if (modalContent) {
        modalContent.innerHTML = "";
    }
    }
    const closeModalButton: HTMLElement | null = document.getElementById("closeModalButton");
    if (closeModalButton) {
    closeModalButton.addEventListener("click", () => {
        clearModalContent();
        closeModal();
    });
    }