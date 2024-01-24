console.log("hola r");

const paintDom = () => {
  console.log("hola dom piant");

  const modal = document.getElementById("modal")!;

  modal.classList.remove("hidden");
};

document.addEventListener("DOMContentLoaded", () => {
  const modalButton = document.getElementById("domButton")!;

  modalButton.addEventListener("click", paintDom);
});
