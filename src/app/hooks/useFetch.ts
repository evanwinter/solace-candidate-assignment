"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Custom hook to help with fetching data from the API.
 * In a production app I might reach for a library like React Query for this.
 * This is basically a simple(r) version of React Query's `useQuery` hook.
 */
export function useFetch<T>(url: string, debounceMs?: number) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Fetch data from the API
  const fetchData = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result.data);
      setStatus("success");
    } catch (error) {
      console.error("Error fetching data:", error);
      setStatus("error");
    }
  }, [url]);

  // Debounce API calls if a debounceMs value is provided
  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    if (debounceMs && debounceMs > 0) {
      debounceTimeout.current = setTimeout(() => {
        fetchData();
      }, debounceMs);
    } else {
      fetchData();
    }
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [fetchData, debounceMs]);

  return { data, status };
}
