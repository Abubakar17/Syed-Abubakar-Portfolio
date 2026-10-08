import { useEffect, useState } from "react";
import { nav, profile } from "../data/content";
import { useActiveSection, useTheme } from "../hooks";

const sectionIds = nav.map((item) => item.id);

export default function Header() {
  const active = useActiveSection(sectionIds);
  const [theme, toggleTheme] = useTheme();
  const [open, setOpen] = useState(false);
  const nextTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="header-inner">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            SMA
          </span>
          <span className="brand-name">{profile.shortName}</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav id="primary-nav" className={open ? "nav is-open" : "nav"} aria-label="Primary">
          <ul>
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <a className="button button-small" href={profile.cv} target="_blank" rel="noopener noreferrer">
              CV<span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
            <button
              className="theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${nextTheme} theme`}
              title={`Switch to ${nextTheme} theme`}
            >
              <ThemeIcon theme={theme} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}

function ThemeIcon({ theme }) {
  return theme === "dark" ? (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
      <path d="M13.5 9.6A5.8 5.8 0 0 1 6.4 2.5a5.8 5.8 0 1 0 7.1 7.1Z" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ) : (
    <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M8 1v1.6M8 13.4V15M1 8h1.6M13.4 8H15M3 3l1.1 1.1M11.9 11.9 13 13M3 13l1.1-1.1M11.9 4.1 13 3"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}
