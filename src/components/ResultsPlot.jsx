// Ranked dot plot of detection F1. A dot (not a bar) is used because the axis
// starts at 0.70: position, not length, carries the value. Every value is also
// printed, so the list doubles as the table view.
const MIN = 0.7;
const MAX = 1.0;
const TICKS = [0.7, 0.8, 0.9, 1.0];
const pct = (v) => `${((v - MIN) / (MAX - MIN)) * 100}%`;

export default function ResultsPlot({ rows }) {
  const sorted = [...rows].sort((a, b) => a.f1 - b.f1);

  return (
    <figure className="plot">
      <figcaption className="plot-title">
        Detection F1 on LifeCLEF 2015 <span>(axis starts at 0.70)</span>
      </figcaption>
      <ol className="plot-rows">
        {sorted.map((row) => (
          <li key={row.method} className={row.ours ? "plot-row is-ours" : "plot-row"}>
            <span className="plot-label" title={row.method}>
              {row.method}
            </span>
            <span className="plot-track" aria-hidden="true">
              <span className="plot-dot" style={{ left: pct(row.f1) }} title={`${row.method}: ${row.f1.toFixed(3)}`} />
            </span>
            <span className="plot-value">{row.f1.toFixed(3)}</span>
          </li>
        ))}
      </ol>
      <div className="plot-axis" aria-hidden="true">
        <span className="plot-label" />
        <span className="plot-ticks">
          {TICKS.map((tick) => (
            <span key={tick} style={{ left: pct(tick) }}>
              {tick.toFixed(2)}
            </span>
          ))}
        </span>
        <span className="plot-value" />
      </div>
    </figure>
  );
}
