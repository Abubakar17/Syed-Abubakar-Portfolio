import fishCompare from "../assets/fish-detection-compare.webp";
import fishTracking from "../assets/fish-tracking-depth.webp";
import lidarRig from "../assets/lidar-rig.webp";
import { caseCards, deepdive, lidar, research } from "../data/content";
import Pipeline from "./Pipeline";
import ResultsPlot from "./ResultsPlot";
import { ArrowLeft, ArrowRight, LinkRow, Tags } from "./ui";

// Full case studies, each rendered as its own page at #/<route>.

function CaseHeader({ project }) {
  return (
    <header className="case-head">
      <p className="case-kicker">{project.kicker}</p>
      <h1 id={`${project.id}-title`}>{project.title}</h1>
      <ul className="case-meta">
        {project.meta.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </header>
  );
}

function Labeled({ label, children }) {
  return (
    <div className="labeled">
      <h2>{label}</h2>
      {children}
    </div>
  );
}

function Figure({ src, width, height, alt, caption, className = "" }) {
  return (
    <figure className={`figure ${className}`}>
      <img src={src} width={width} height={height} alt={alt} loading="lazy" decoding="async" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function Results({ items, className = "results" }) {
  return (
    <ul className={className}>
      {items.map((r) => (
        <li key={r.label}>
          <strong>{r.value}</strong>
          <span>{r.label}</span>
          {r.note && <small>{r.note}</small>}
        </li>
      ))}
    </ul>
  );
}

function Chain({ steps, label }) {
  return (
    <ol className="chain" aria-label={label} data-reveal>
      {steps.map((step) => (
        <li key={step.name}>
          <strong>{step.name}</strong>
          <span>{step.note}</span>
        </li>
      ))}
    </ol>
  );
}

function CaseFoot({ project }) {
  return (
    <footer className="case-foot" data-reveal>
      <Labeled label="My contribution">
        <p>{project.contribution}</p>
      </Labeled>
      <div className="case-foot-side">
        <Tags items={project.stack} />
        <LinkRow links={project.links} />
      </div>
    </footer>
  );
}

function DeepDive() {
  const p = deepdive;
  return (
    <article className="case" id={p.id} aria-labelledby={`${p.id}-title`}>
      <div data-reveal>
        <CaseHeader project={p} />
        <div className="case-brief">
          <Labeled label="Problem">
            <p>{p.problem}</p>
          </Labeled>
          <Labeled label="Why it matters">
            <p>{p.why}</p>
          </Labeled>
        </div>
      </div>

      <div data-reveal>
        <Labeled label="Approach">
          <p className="case-approach">{p.approach}</p>
        </Labeled>
        <Pipeline stages={p.stages} initial="depth" />
      </div>

      <Figure
        src={fishTracking}
        width="940"
        height="438"
        alt={p.figures.tracking.alt}
        caption={p.figures.tracking.caption}
      />

      <div className="case-results" data-reveal>
        <div>
          <h2 className="block-label">Results</h2>
          <Results items={p.results} />
          <p className="case-note">
            <span>Limitation.</span> {p.limitation}
          </p>
        </div>
        <ResultsPlot rows={p.comparison} />
      </div>

      <Figure
        src={fishCompare}
        width="799"
        height="312"
        alt={p.figures.compare.alt}
        caption={p.figures.compare.caption}
      />

      <CaseFoot project={p} />
    </article>
  );
}

function AgenticAL() {
  const p = research.aal;
  return (
    <article className="case" id={p.id} aria-labelledby={`${p.id}-title`}>
      <div data-reveal>
        <CaseHeader project={p} />
        <div className="case-brief">
          <Labeled label="Problem">
            <p>{p.problem}</p>
          </Labeled>
          <Labeled label="Idea">
            <p>{p.idea}</p>
          </Labeled>
        </div>
      </div>

      <div data-reveal>
        <Labeled label="Selection loop">
          <p className="case-approach">
            Each round, every unlabelled X-ray is scored by its distance to the labelled set in both text and
            image space, and the most distant ones go to a dentist.
          </p>
        </Labeled>
      </div>
      <Chain steps={p.pipeline} label="Agentic active learning loop" />

      <div data-reveal>
        <h2 className="block-label">Results</h2>
        <Results items={p.results} className="results results-4" />
        <p className="case-note">{p.note}</p>
      </div>

      <CaseFoot project={p} />
    </article>
  );
}

function LidarPose() {
  const p = lidar;
  return (
    <article className="case" id={p.id} aria-labelledby={`${p.id}-title`}>
      <div className="lidar-grid" data-reveal>
        <div>
          <CaseHeader project={p} />
          <Labeled label="Problem">
            <p>{p.problem}</p>
          </Labeled>
          <Labeled label="Approach">
            <p>{p.approach}</p>
          </Labeled>
        </div>
        <Figure src={lidarRig} width="563" height="622" alt={p.figure.alt} caption={p.figure.caption} />
      </div>

      <Chain steps={p.pipeline} label="LiDAR pose pipeline" />

      <div className="lidar-results" data-reveal>
        <div>
          <h2 className="block-label">Results</h2>
          <Results items={p.headline} className="results results-compact" />
        </div>
        <table className="axis-table">
          <caption>Held-out test error (MAE) per axis</caption>
          <thead>
            <tr>
              {p.metrics.map((m) => (
                <th key={m.axis} scope="col">
                  {m.axis}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {p.metrics.map((m) => (
                <td key={m.axis}>
                  {m.value}
                  <span>{m.unit}</span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <p className="case-note">{p.note}</p>
      </div>

      <CaseFoot project={p} />
    </article>
  );
}

export const cases = {
  deepdive: { Component: DeepDive, title: deepdive.title },
  aal: { Component: AgenticAL, title: research.aal.title },
  lidar: { Component: LidarPose, title: lidar.title },
};

export default function CasePage({ route }) {
  const { Component } = cases[route];
  const order = caseCards.map((card) => card.route);
  const next = caseCards[(order.indexOf(route) + 1) % order.length];

  return (
    <div className="case-page">
      <a className="back-link" href="#work">
        <ArrowLeft /> All work
      </a>
      <Component />
      <nav className="case-next" aria-label="Next case study">
        <span>Next case study</span>
        <a href={`#/${next.route}`}>
          {next.title} <ArrowRight />
        </a>
      </nav>
    </div>
  );
}
