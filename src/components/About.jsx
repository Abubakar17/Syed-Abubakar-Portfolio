import { about, stack } from "../data/content";
import { SectionHead } from "./ui";

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <SectionHead
        id="about-title"
        index="04"
        eyebrow="About"
        title="Electrical engineering → ML → computer vision → robotics."
      />
      <div className="about-grid">
        <div className="prose" data-reveal>
          {about.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <div data-reveal>
          <h3 className="block-label">Toolkit</h3>
          <dl className="stack">
            {stack.map((group) => (
              <div key={group.group}>
                <dt>{group.group}</dt>
                <dd>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
