import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export default {
  getEvents: async () => (await API.get("/events")).data,
  getEvent: async (id) => (await API.get(`/events/${id}`)).data,
};
