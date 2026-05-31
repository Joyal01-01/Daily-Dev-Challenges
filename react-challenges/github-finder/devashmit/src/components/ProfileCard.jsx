/** Displays the GitHub user's profile info */
export default function ProfileCard({ user }) {
  return (
    <section className="profile-card" aria-label="GitHub profile">
      {/* Avatar + basic info */}
      <div className="profile-card__header">
        <img
          className="profile-card__avatar"
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          width={100}
          height={100}
        />
        <div className="profile-card__info">
          <h1 className="profile-card__name">
            {user.name || user.login}
          </h1>
          <a
            className="profile-card__login"
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${user.login} on GitHub`}
          >
            @{user.login}
          </a>
          {user.bio && <p className="profile-card__bio">{user.bio}</p>}

          <div className="profile-card__details">
            {user.location && (
              <span className="detail-item">📍 {user.location}</span>
            )}
            {user.company && (
              <span className="detail-item">🏢 {user.company}</span>
            )}
            {user.blog && (
              <a
                className="detail-item detail-item--link"
                href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 {user.blog}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="profile-card__stats" role="list">
        <div className="stat-box" role="listitem">
          <span className="stat-box__num">{user.public_repos.toLocaleString()}</span>
          <span className="stat-box__label">Repos</span>
        </div>
        <div className="stat-box" role="listitem">
          <span className="stat-box__num">{user.followers.toLocaleString()}</span>
          <span className="stat-box__label">Followers</span>
        </div>
        <div className="stat-box" role="listitem">
          <span className="stat-box__num">{user.following.toLocaleString()}</span>
          <span className="stat-box__label">Following</span>
        </div>
      </div>
    </section>
  );
}
