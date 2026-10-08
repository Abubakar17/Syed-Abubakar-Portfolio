import { profile, research } from "../data/content";
import { Fact, LinkRow, SectionHead, Tags } from "./ui";

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
          <h3 className="block-label">Manuscripts</h3>
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

      <AgenticAL />

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

function AgenticAL() {
  const p = research.aal;
  return (
    <article className="aal" id={p.id} aria-labelledby={`${p.id}-title`}>
      <header className="case-head" data-reveal>
        <p className="case-kicker">{p.kicker}</p>
        <h3 id={`${p.id}-title`}>{p.title}</h3>
      </header>

      <div className="case-brief" data-reveal>
        <div className="labeled">
          <h4>Problem</h4>
          <p>{p.problem}</p>
        </div>
        <div className="labeled">
          <h4>Idea</h4>
          <p>{p.idea}</p>
        </div>
      </div>

      <ol className="chain" aria-label="Agentic active learning loop" data-reveal>
        {p.pipeline.map((step) => (
          <li key={step.name}>
            <strong>{step.name}</strong>
            <span>{step.note}</span>
          </li>
        ))}
      </ol>

      <div data-reveal>
        <ul className="results results-4">
          {p.results.map((r) => (
            <li key={r.label}>
              <strong>{r.value}</strong>
              <span>{r.label}</span>
              <small>{r.note}</small>
            </li>
          ))}
        </ul>
        <p className="case-note">{p.note}</p>
        <div className="aal-foot">
          <Tags items={p.stack} />
        </div>
      </div>
    </article>
  );
}
