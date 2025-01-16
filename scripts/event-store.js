export function initEventStore() {
  document.addEventListener("event-create", (event) => {
    const createdEvent = event.detail.event;
    const events = getEventsFromLocal();
    events.push(createdEvent);
    saveEventIntoLocal(events);
  });
}

function saveEventIntoLocal(events) {
  const safeToStringifyEvents = events.map((event) => ({
    ...event,
    date: event.date.toISOString(),
  }));

  let stringifiedEvents;
  try {
    stringifiedEvents = JSON.stringify(safeToStringifyEvents);
  } catch (error) {
    console.error("Stringify events failed", error);
  }

  localStorage.setItem("events", stringifiedEvents);
}

function getEventsFromLocal() {
  const localEvents = localStorage.getItem("events");
  if (localEvents === null) {
    return [];
  }

  let parsedEvents;
  try {
    parsedEvents = JSON.parse(localEvents);
  } catch (error) {
    console.error("Parse events failed", error);
    return [];
  }

  const events = parsedEvents.map((event) => ({
    ...event,
    date: new Date(event.date),
  }));

  return events;
}
