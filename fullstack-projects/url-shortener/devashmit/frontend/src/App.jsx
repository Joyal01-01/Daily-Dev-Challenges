import { useState, useEffect, useCallback } from "react";

const API = "http://localhost:8000";

export default function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Fetch analytics on mount and after each shorten
  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await fetch(`${API}/analytics`);
      if (res.ok) setAnalytics(await res.json());
    } catch {
      // silently fail — analytics is non-critical
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const handleShorten = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to shorten URL");
      }

      const data = await res.json();
      setResult(data);
      setUrl("");
      fetchAnalytics();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.short_url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="app">
      <div>
        <h1>🔗 URL <span>Shortener</span></h1>
        <p className="subtitle">Shorten any URL and track how many times it's clicked.</p>
      </div>

      {/* Shorten form */}
      <form className="shorten-form" onSubmit={handleShorten}>
        <input
          className="url-input"
          type="url"
          placeholder="https://example.com/very/long/url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-label="URL to shorten"
        />
        <button className="btn-shorten" type="submit" disabled={loading}>
          {loading ? "Shortening…" : "Shorten"}
        </button>
      </form>

      {error && <p className="error-msg" role="alert">⚠️ {error}</p>}

      {/* Result */}
      {result && (
        <div className="result-card" role="region" aria-label="Shortened URL">
          <a
            className="result-card__link"
            href={result.short_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {result.short_url}
          </a>
          <button
            className={`btn-copy ${copied ? "copied" : ""}`}
            onClick={handleCopy}
            aria-label="Copy short URL to clipboard"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      )}

      {/* Analytics */}
      <section className="analytics-section" aria-label="Link analytics">
        <h2>Analytics</h2>
        {analytics.length === 0 ? (
          <p className="empty-state">No links shortened yet. Create one above!</p>
        ) : (
          <ul className="analytics-list" role="list">
            {analytics.map((item) => (
              <li key={item.code} className="analytics-item">
                <span className="analytics-item__code">/{item.code}</span>
                <span className="analytics-item__original" title={item.original}>
                  {item.original}
                </span>
                <span className="analytics-item__clicks">
                  {item.clicks} {item.clicks === 1 ? "click" : "clicks"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
