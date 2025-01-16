export function initEventStore() {
  document.addEventListener("event-create", (event) => {
    const createdEvent = event.detail.event;
    console.log(createdEvent);
  });
}
