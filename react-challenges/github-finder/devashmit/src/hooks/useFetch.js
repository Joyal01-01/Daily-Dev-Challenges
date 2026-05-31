import { useState, useEffect } from "react";

/**
 * Custom useFetch hook — reusable async data fetching.
 * Returns { data, loading, error }.
 * Re-fetches whenever `url` changes.
 * Pass null/undefined url to skip fetching.
 */
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const res = await fetch(url);

        if (!res.ok) {
          if (res.status === 404) throw new Error("User not found");
          if (res.status === 403) throw new Error("API rate limit exceeded — try again later");
          throw new Error(`GitHub API error: ${res.status}`);
        }

        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    // Cleanup: ignore stale responses if url changes mid-flight
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}
