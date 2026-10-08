import { education, experience, honors } from "../data/content";
import { SectionHead, Tags } from "./ui";

export default function Experience() {
  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <SectionHead id="experience-title" index="03" eyebrow="Experience" title="Industry, labs, infrastructure." />

      {/* One scannable line per role; the full bullets open on demand. */}
      <ol className="roles">
        {experience.map((job) => (
          <li key={`${job.org}-${job.role}`} data-reveal>
            <details className="role">
              <summary>
                <span className="role-meta">
                  <span className="role-period">{job.period}</span>
                  <span className="role-place">{job.place}</span>
                </span>
                <span className="role-main">
                  <h3>
                    <span className="role-org">{job.org}</span>
                    <span className="role-title">{job.role}</span>
                  </h3>
                  <span className="role-summary">{job.summary}</span>
                </span>
                <span className="role-toggle" aria-hidden="true" />
              </summary>
              <div className="role-detail">
                <ul className="role-points">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Tags items={job.tags} />
              </div>
            </details>
          </li>
        ))}
      </ol>

      <div className="split" id="education">
        <div data-reveal>
          <h3 className="block-label">Education</h3>
          <ul className="edu">
            {education.map((item) => (
              <li key={item.degree}>
                <h4>{item.degree}</h4>
                <p className="edu-note">
                  {item.note} · {item.period}
                </p>
                <p>{item.school}</p>
                <p className="edu-detail">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal>
          <h3 className="block-label">Honours &amp; awards</h3>
          <ul className="honors">
            {honors.map((item) => (
              <li key={item.title}>
                <span className="honor-year">{item.year}</span>
                <div>
                  <h4>{item.title}</h4>
                  {(item.org || item.detail) && (
                    <p>
                      {item.org}
                      {item.org && item.detail ? ". " : ""}
                      {item.detail}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
