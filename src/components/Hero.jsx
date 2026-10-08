import portrait from "../assets/portrait.webp";
import { profile, proof } from "../data/content";
import { TextLink } from "./ui";

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            {profile.role} · {profile.location}
          </p>
          <h1 id="hero-title">{profile.name}</h1>
          <p className="hero-statement">
            I build perception systems that turn messy sensor data into physical measurements: a fish's
            length from <em>one</em> underwater camera, an object's 6-DoF pose from <em>one</em> 2D LiDAR.
          </p>
          <p className="hero-sub">
            ML engineer with a year in industry, two research manuscripts (one as lead author), and an Erasmus
            Mundus master's now at the University of Genoa. Currently seeking a <strong>master's thesis internship</strong> in ML / computer vision.
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
          <li key={item.value}>
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
