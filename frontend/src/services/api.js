import axios from 'axios';
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  withCredentials: false
});

export default {
  getEvents: () => API.get('/events').then(r => r.data),
  getEvent: id => API.get(`/events/${id}`).then(r => r.data),
  createEvent: data => API.post('/events', data).then(r => r.data),
  rsvpEvent: (id, payload) => API.post(`/events/${id}/rsvp`, payload).then(r => r.data),
  createCheckout: (id, payload) => API.post(`/events/${id}/create-checkout-session`, payload).then(r => r.data),
  checkinTicket: payload => API.post('/tickets/checkin', payload).then(r => r.data)
};
