import { initToaster } from "./toaster.js";

export function initNotifications() {
  const toaster = initToaster(document.body);

  document.addEventListener("event-create", () =>
    toaster.success("Event has been created")
  );
}