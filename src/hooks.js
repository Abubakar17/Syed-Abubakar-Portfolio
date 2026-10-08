import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

// "#/deepdive" is a page route; anything else ("", "#work", "#top") is the home page.
const readRoute = () => {
  const hash = window.location.hash;
  return hash.startsWith("#/") ? hash.slice(2) : "";
};

export function useHashRoute() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const onChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

// Case pages open at the top; returning home lands on the requested anchor,
// or back where the visitor left the home page.
export function useRouteScroll(route, titleFor) {
  const homeY = useRef(0);
  const firstRender = useRef(true);

  useEffect(() => {
    const onScroll = () => {
      if (readRoute() === "") homeY.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    document.title = titleFor(route);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (route) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    const anchor = window.location.hash.slice(1);
    const target = anchor && document.getElementById(anchor);
    if (target) target.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: homeY.current, behavior: "instant" });
  }, [route, titleFor]);
}

// Highlights the nav item for whichever section crosses the upper third of the viewport.
export function useActiveSection(ids, route) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    setActive(null);
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
  }, [ids, route]);

  return active;
}

// One-shot fade-in for [data-reveal] blocks, re-armed on every route change.
// Content is visible by default; the hidden start state only applies once
// this hook has marked <html> as ready.
export function useReveal(route) {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    document.documentElement.classList.add("reveal-ready");

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
    document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [route]);
}
