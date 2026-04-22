const API = import.meta.env.VITE_API_URL;

export const getEvents = () =>
  fetch(`${API}/api/events`).then(res => res.json());

export const getEventById = (id) =>
  fetch(`${API}/api/events/${id}`).then(res => res.json());

export const createTicket = (data) =>
  fetch(`${API}/api/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const getTickets = () =>
  fetch(`${API}/api/tickets`).then(res => res.json());