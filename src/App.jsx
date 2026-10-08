import About from "./components/About";
import Contact, { Footer } from "./components/Contact";
import Experience from "./components/Experience";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Research from "./components/Research";
import Work from "./components/Work";
import { useReveal } from "./hooks";

export default function App() {
  useReveal();

  return (
    <>
      <Header />
      <main id="main" tabIndex="-1">
        <Hero />
        <Work />
        <Research />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
