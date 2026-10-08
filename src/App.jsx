import About from "./components/About";
import CasePage, { cases } from "./components/Cases";
import Contact, { Footer } from "./components/Contact";
import Experience from "./components/Experience";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Research from "./components/Research";
import Work from "./components/Work";
import { profile } from "./data/content";
import { useHashRoute, useReveal, useRouteScroll } from "./hooks";

const HOME_TITLE = `${profile.name} · ${profile.role}`;
const titleFor = (route) => (cases[route] ? `${cases[route].title} · ${profile.name}` : HOME_TITLE);

export default function App() {
  const hashRoute = useHashRoute();
  const route = cases[hashRoute] ? hashRoute : "";
  useRouteScroll(route, titleFor);
  useReveal(route);

  return (
    <>
      <Header route={route} />
      <main id="main" tabIndex="-1" key={route || "home"}>
        {route ? (
          <CasePage route={route} />
        ) : (
          <>
            <Hero />
            <Work />
            <Research />
            <Experience />
            <About />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
