import { profile } from "../data/content";
import { SectionHead, TextLink } from "./ui";

export default function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <SectionHead id="contact-title" index="05" eyebrow="Contact" title="Let's talk about perception problems.">
        <p>
          Open to a master's thesis internship in ML or computer vision, and to research collaborations.
          Based in {profile.location}.
        </p>
      </SectionHead>

      <div className="contact-main" data-reveal>
        <a className="contact-email" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <ul className="contact-links">
          <li>
            <TextLink href={profile.linkedin}>LinkedIn</TextLink>
          </li>
          <li>
            <TextLink href={profile.github}>GitHub</TextLink>
          </li>
          <li>
            <TextLink href={profile.cv}>CV (PDF)</TextLink>
          </li>
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <p>Built with React and Vite. No trackers, no cookies.</p>
    </footer>
  );
}
