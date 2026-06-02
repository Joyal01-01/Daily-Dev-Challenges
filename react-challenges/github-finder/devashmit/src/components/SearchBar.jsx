import { useState } from "react";

export default function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) onSearch(trimmed);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <div className="search-bar__inner">
        <span className="search-bar__icon" aria-hidden="true">🔍</span>
        <input
          className="search-bar__input"
          type="text"
          placeholder="Search GitHub username…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="GitHub username"
          autoComplete="off"
          autoFocus
        />
        <button
          className="search-bar__btn"
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Search"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </div>
    </form>
  );
}
