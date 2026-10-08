import fishCompare from "../assets/fish-detection-compare.webp";
import fishTracking from "../assets/fish-tracking-depth.webp";
import lidarRig from "../assets/lidar-rig.webp";
import { deepdive, lidar, moreProjects } from "../data/content";
import Pipeline from "./Pipeline";
import ResultsPlot from "./ResultsPlot";
import { Fact, LinkRow, SectionHead, Tags, TextLink } from "./ui";

export default function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <SectionHead id="work-title" index="01" eyebrow="Selected work" title="Perception systems, measured.">
        <p>Two case studies in depth, then a short list of other work.</p>
      </SectionHead>
      <DeepDive />
      <LidarPose />
      <MoreWork />
    </section>
  );
}

function CaseHeader({ project }) {
  return (
    <header className="case-head">
      <p className="case-kicker">{project.kicker}</p>
      <h3 id={`${project.id}-title`}>{project.title}</h3>
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
      <h4>{label}</h4>
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

function DeepDive() {
  const p = deepdive;
  return (
    <article className="case case-flagship" id={p.id} aria-labelledby={`${p.id}-title`}>
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

      <div className="case-block" data-reveal>
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
        className="figure-wide"
      />

      <div className="case-results" data-reveal>
        <div>
          <h4 className="block-label">Results</h4>
          <ul className="results">
            {p.results.map((r) => (
              <li key={r.label}>
                <strong>{r.value}</strong>
                <span>{r.label}</span>
                <small>{r.note}</small>
              </li>
            ))}
          </ul>
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
        className="figure-wide"
      />

      <footer className="case-foot" data-reveal>
        <Labeled label="My contribution">
          <Fact as="p" value={p.contribution} />
        </Labeled>
        <div className="case-foot-side">
          <Tags items={p.stack} />
          <LinkRow links={p.links} />
        </div>
      </footer>
    </article>
  );
}

function LidarPose() {
  const p = lidar;
  return (
    <article className="case case-featured" id={p.id} aria-labelledby={`${p.id}-title`}>
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

      <ol className="chain" aria-label="LiDAR pose pipeline" data-reveal>
        {p.pipeline.map((step) => (
          <li key={step.name}>
            <strong>{step.name}</strong>
            <span>{step.note}</span>
          </li>
        ))}
      </ol>

      <div className="lidar-results" data-reveal>
        <ul className="results results-compact">
          {p.headline.map((r) => (
            <li key={r.label}>
              <strong>{r.value}</strong>
              <span>{r.label}</span>
            </li>
          ))}
        </ul>
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

      <footer className="case-foot" data-reveal>
        <Labeled label="My contribution">
          <Fact as="p" value={p.contribution} />
        </Labeled>
        <div className="case-foot-side">
          <Tags items={p.stack} />
          <LinkRow links={p.links} />
        </div>
      </footer>
    </article>
  );
}

function MoreWork() {
  return (
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
  );
}
