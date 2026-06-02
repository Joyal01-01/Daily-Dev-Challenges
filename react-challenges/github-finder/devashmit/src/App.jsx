import { useState } from "react";
import { useFetch } from "./hooks/useFetch";
import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";
import RepoList from "./components/RepoList";
import Skeleton from "./components/Skeleton";

const GH_API = "https://api.github.com";

export default function App() {
  const [username, setUsername] = useState("");

  // Fetch user profile
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetch(username ? `${GH_API}/users/${username}` : null);

  // Fetch repos only once we have a valid user
  const {
    data: repos,
    loading: reposLoading,
  } = useFetch(user ? `${GH_API}/users/${username}/repos?per_page=100&sort=pushed` : null);

  const isLoading = userLoading || reposLoading;

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">
          <span aria-hidden="true">🐙</span> GitHub Profile Finder
        </h1>
        <p className="app__subtitle">Search any GitHub username to view their profile</p>
      </header>

      <main className="app__main">
        <SearchBar onSearch={setUsername} loading={userLoading} />

        {/* Loading skeleton */}
        {isLoading && <Skeleton />}

        {/* Error state */}
        {!isLoading && userError && (
          <div className="error-card" role="alert">
            <span className="error-card__icon" aria-hidden="true">⚠️</span>
            <p className="error-card__msg">{userError}</p>
            <p className="error-card__hint">
              Check the username and try again.
            </p>
          </div>
        )}

        {/* Results */}
        {!isLoading && !userError && user && (
          <div className="results">
            <ProfileCard user={user} />
            <RepoList repos={repos} />
          </div>
        )}

        {/* Empty state — no search yet */}
        {!isLoading && !userError && !user && !username && (
          <div className="empty-state" aria-label="Search prompt">
            <span className="empty-state__icon" aria-hidden="true">👆</span>
            <p>Enter a GitHub username above to get started</p>
          </div>
        )}
      </main>
    </div>
  );
}
