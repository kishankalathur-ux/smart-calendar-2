// Load events when page opens
fetch("/events")
  .then(res => res.json())
  .then(events => {
    const list = document.getElementById("events");
    events.forEach(e => {
      const item = document.createElement("li");
      item.textContent = `${e.date}: ${e.text}`;
      list.appendChild(item);
    });
  });

// Add new event
function addEvent() {
  const date = document.getElementById("date").value;
  const text = document.getElementById("text").value;

  fetch("/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date, text })
  }).then(() => location.reload());
}