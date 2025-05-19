"use client";

import { useSearchParams } from "next/navigation";
import { useFetch } from "./useFetch";
import type { Advocate } from "../api/advocates/route";

/**
 * Custom hook that encapsulates the logic for fetching advocates from the API
 * in conjunction with URL search parameters.
 */
export function useAdvocates() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  let url = `/api/advocates`;

  if (query) {
    url += `?query=${query}`;
  }

  return useFetch<Advocate[]>(url, 300);
}
