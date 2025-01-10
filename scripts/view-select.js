export function initViewSelect() {
  const viewSelectElement = document.querySelector("[data-view-select]");

  console.log(viewSelectElement.value);
  viewSelectElement.addEventListener("change", (event) => {
    viewSelectElement.dispatchEvent(
      new CustomEvent("view-change", {
        detail: {
          view: viewSelectElement.value,
        },
        bubbles: true,
      })
    );
  });
}
