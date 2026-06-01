/** Renders the top 5 repos sorted by stars */
export default function RepoList({ repos }) {
  if (!repos || repos.length === 0) {
    return <p className="no-repos">No public repositories found.</p>;
  }

  const top5 = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5);

  return (
    <section className="repo-list" aria-label="Top repositories">
      <h2 className="repo-list__title">Top Repositories</h2>
      <ul className="repo-list__grid" role="list">
        {top5.map((repo) => (
          <li key={repo.id} className="repo-card">
            <div className="repo-card__header">
              <a
                className="repo-card__name"
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${repo.name} repository`}
              >
                📁 {repo.name}
              </a>
              {repo.fork && <span className="repo-card__fork-badge">fork</span>}
            </div>

            {repo.description && (
              <p className="repo-card__desc">{repo.description}</p>
            )}

            <div className="repo-card__meta">
              {repo.language && (
                <span className="repo-card__lang">
                  <span className="lang-dot" aria-hidden="true" />
                  {repo.language}
                </span>
              )}
              <span className="repo-card__stars" aria-label={`${repo.stargazers_count} stars`}>
                ⭐ {repo.stargazers_count.toLocaleString()}
              </span>
              <span className="repo-card__forks" aria-label={`${repo.forks_count} forks`}>
                🍴 {repo.forks_count.toLocaleString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
