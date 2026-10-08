import portrait from "../assets/portrait.webp";
import { employers, profile, proof } from "../data/content";
import { TextLink } from "./ui";

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <a className="status" href="#contact">
            <span className="status-dot" aria-hidden="true" />
            <span className="status-text">
              <strong>{profile.seeking.headline}</strong>
              <span>
                {profile.seeking.role} · {profile.seeking.focus}
              </span>
            </span>
          </a>
          <p className="eyebrow">
            {profile.role} · {profile.location}
          </p>
          <h1 id="hero-title">{profile.name}</h1>
          <p className="hero-statement">
            I build perception systems that turn messy sensor data into physical measurements: a fish's
            length from <em>one</em> underwater camera, an object's 6-DoF pose from <em>one</em> 2D LiDAR.
          </p>
          <div className="employers">
            <span className="employers-label">Experience at</span>
            <ul>
              {employers.map((item) => (
                <li key={item.name} className={item.strong ? "is-strong" : undefined}>
                  <a href="#experience" title={item.role}>
                    <strong>{item.name}</strong>
                    {item.strong && <span>{item.role}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="hero-sub">
            Erasmus Mundus scholar, now at the University of Genoa (Computer Engineering).
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#work">
              View projects
            </a>
            <a className="button" href="#research">
              View research
            </a>
          </div>
          <ul className="hero-links" aria-label="Profiles">
            <li>
              <TextLink href={profile.github}>GitHub</TextLink>
            </li>
            <li>
              <TextLink href={profile.linkedin}>LinkedIn</TextLink>
            </li>
            <li>
              <TextLink href={profile.cv}>CV (PDF)</TextLink>
            </li>
            <li>
              <a className="text-link" href={`mailto:${profile.email}`}>
                Email
              </a>
            </li>
          </ul>
        </div>

        <figure className="portrait">
          <div className="portrait-frame">
            <img
              src={portrait}
              width="591"
              height="829"
              alt="Syed Muhammad Abubakar in a suit, smiling, in front of his DeepDive research poster."
              fetchpriority="high"
              decoding="async"
            />
            <span className="detect-box" aria-hidden="true">
              <span className="detect-label">id 01 · conf 0.99</span>
            </span>
          </div>
          <figcaption>Behind me: the DeepDive poster.</figcaption>
        </figure>
      </div>

      <ul className="proof" aria-label="Highlights">
        {proof.map((item) => (
          <li key={item.value} className={item.highlight ? "is-highlight" : undefined}>
            <a href={item.href}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
