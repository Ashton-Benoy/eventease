const BASE_URL = import.meta.env.VITE_API_URL;

export const getEvents = () =>
  fetch(`${BASE_URL}/api/events`).then(res => res.json());

export const getEventById = (id) =>
  fetch(`${BASE_URL}/api/events/${id}`).then(res => res.json());

export const createTicket = (data) =>
  fetch(`${BASE_URL}/api/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const getTickets = () =>
  fetch(`${BASE_URL}/api/tickets`).then(res => res.json());