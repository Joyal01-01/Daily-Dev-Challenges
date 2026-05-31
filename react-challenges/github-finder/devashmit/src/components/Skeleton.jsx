/** Loading skeleton — shown while profile data is being fetched */
export default function Skeleton() {
  return (
    <div className="skeleton-wrapper" aria-busy="true" aria-label="Loading profile">
      {/* Profile header */}
      <div className="skeleton-profile">
        <div className="skeleton skeleton--avatar" />
        <div className="skeleton-profile__info">
          <div className="skeleton skeleton--line skeleton--name" />
          <div className="skeleton skeleton--line skeleton--bio" />
          <div className="skeleton skeleton--line skeleton--bio skeleton--short" />
        </div>
      </div>

      {/* Stats row */}
      <div className="skeleton-stats">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton skeleton--stat" />
        ))}
      </div>

      {/* Repo cards */}
      <div className="skeleton-repos">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton skeleton--repo" />
        ))}
      </div>
    </div>
  );
}
