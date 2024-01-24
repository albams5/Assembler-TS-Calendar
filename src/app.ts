console.log("hola r");

const paintDom = () => {
  console.log("hola dom piant");

  const modal = document.getElementById("modal")!;

  modal.classList.remove("hidden");
};

document.addEventListener("DOMContentLoaded", () => {
  const modalButton = document.getElementById("domButton")!;
  const modal = document.getElementById("modal")!;

  modalButton.addEventListener("click", paintDom);

  //press key scape to close modal
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" || event.key === "Esc") {
      modal.classList.add("hidden");
    }
  });
});
