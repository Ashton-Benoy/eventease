import { useQuery } from "@tanstack/react-query";
import API from "../services/api";

export function useEvents() {
  return useQuery(["events"], API.getEvents, { staleTime: 1000 * 30, retry: 1 });
}
