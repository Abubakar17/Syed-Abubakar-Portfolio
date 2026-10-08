import { useEffect, useState } from "react";

function readStoredTheme() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

// The initial theme is applied before paint by the inline script in index.html;
// this hook only keeps React and <html data-theme> in sync afterwards.
export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || readStoredTheme() || "dark"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
  }, [theme]);

  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

// Highlights the nav item for whichever section crosses the upper third of the viewport.
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

// One-shot fade-in for [data-reveal] blocks. Content is visible by default;
// the hidden start state only applies once this hook has marked <html> as ready.
export function useReveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
