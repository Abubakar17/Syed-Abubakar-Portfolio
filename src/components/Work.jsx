import { caseCards, moreProjects } from "../data/content";
import { ArrowRight, SectionHead, Tags, TextLink } from "./ui";

// Home-page overview: one card per case study, then a compact list of smaller work.
export default function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <SectionHead id="work-title" index="01" eyebrow="Selected work" title="Perception systems, measured.">
        <p>Three projects, one headline result each. Open any of them for the full case study.</p>
      </SectionHead>

      <ul className="cards">
        {caseCards.map((card) => (
          <li key={card.route} data-reveal>
            <a className="card" href={`#/${card.route}`}>
              <p className="card-kicker">{card.kicker}</p>
              <h3>{card.title}</h3>
              <p className="card-metric">
                <strong>{card.metric}</strong>
                <span>{card.metricLabel}</span>
              </p>
              <p className="card-summary">{card.summary}</p>
              <ol className="card-chain" aria-label="Pipeline">
                {card.chain.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <span className="card-foot">
                <span className="card-role">{card.role}</span>
                <span className="card-cta">
                  Read case study <ArrowRight />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="more" data-reveal>
        <h3 className="block-label">Also built</h3>
        <ul className="more-list">
          {moreProjects.map((project) => (
            <li key={project.title}>
              <div className="more-title">
                <h4>{project.title}</h4>
                <span>{project.year}</span>
              </div>
              <p>{project.summary}</p>
              <div className="more-meta">
                <Tags items={project.stack} />
                {project.href && <TextLink href={project.href}>Code</TextLink>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
