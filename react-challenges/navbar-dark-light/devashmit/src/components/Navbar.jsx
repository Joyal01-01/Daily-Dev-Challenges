import { useState } from "react";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header>
      <nav className="navbar" aria-label="Main navigation">
        <div className="navbar__inner">
          <a href="#" className="navbar__logo">dev<span>ashmit</span></a>

          {/* Desktop links */}
          <ul className="navbar__links" role="list">
            <NavLinks />
          </ul>

          <div className="navbar__right">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`navbar__mobile ${menuOpen ? "open" : ""}`} role="navigation" aria-label="Mobile navigation">
          <NavLinks onLinkClick={closeMenu} />
        </div>
      </nav>
    </header>
  );
}
