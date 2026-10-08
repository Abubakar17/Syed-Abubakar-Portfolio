import { profile, research } from "../data/content";
import { Fact, LinkRow, SectionHead } from "./ui";

function Authors({ authors }) {
  if (!Array.isArray(authors)) return <Fact value={authors} />;
  return authors.map((name, index) => (
    <span key={name}>
      {name.includes("Abubakar") ? <b>{name}</b> : name}
      {index < authors.length - 1 ? ", " : ""}
    </span>
  ));
}

export default function Research() {
  return (
    <section className="section" id="research" aria-labelledby="research-title">
      <SectionHead id="research-title" index="02" eyebrow="Research" title="Measurement from imperfect sensors.">
        <p>{research.statement}</p>
      </SectionHead>

      <div className="research-grid">
        <div className="research-col" data-reveal>
          <h3 className="block-label">Interests</h3>
          <dl className="interests">
            {research.interests.map((item) => (
              <div key={item.title}>
                <dt>{item.title}</dt>
                <dd>{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="research-col" data-reveal>
          <h3 className="block-label">Publications</h3>
          <ol className="papers">
            {research.papers.map((paper, index) => (
              <li key={paper.venue}>
                <span className="paper-index" aria-hidden="true">
                  [{index + 1}]
                </span>
                <div>
                  <p className="paper-authors">
                    <Authors authors={paper.authors} />
                  </p>
                  <Fact as="h4" value={paper.title} />
                  <p className="paper-venue">
                    <i>{paper.venue}</i>, {paper.year} · <span className="paper-status">{paper.status}</span>
                  </p>
                  <p className="paper-summary">{paper.summary}</p>
                  <LinkRow links={paper.links} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <aside className="seeking" data-reveal aria-label="Currently seeking">
        <p>
          <span className="status-dot" aria-hidden="true" />
          {research.seeking}
        </p>
        <a className="button button-primary" href={`mailto:${profile.email}?subject=Thesis%20internship`}>
          Get in touch
        </a>
      </aside>
    </section>
  );
}
